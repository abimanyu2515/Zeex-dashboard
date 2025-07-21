from fastapi import HTTPException, Depends
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError
from . import models, schemas, database, config
from datetime import datetime, timedelta, timezone
import secrets
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import traceback

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_pass(password: str):
    return pwd_context.hash(password)

def verify_pass(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_user(db: Session, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    else:
        db_user = models.User(
        name=user.name,
        email=user.email,
        password=get_pass(user.password),
        status='pending',
        is_active=False
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return {"message": "User created successfully. Please wait for admin approval."}


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


def login_check(db: Session, user: schemas.UserLogin):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if not db_user or not verify_pass(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    if db_user.status != 'approved' or not db_user.is_active:
        raise HTTPException(status_code=403, detail='You are not approved by admin. Please contact admin')
    return db_user

def admin_create_user(db: Session, user: schemas.AdminUserCreate):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if db_user:
        raise HTTPException(status_code=400, detail="User Exists")
    
    else:
        db_user = models.User(
            name=user.name,
            email=user.email,
            password=get_pass(user.password),
            role=user.role,
            status="approved",  # Admin created users are auto-approved
            is_active=True
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token or expired")

    user = db.query(models.User).filter(models.User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_current_admin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user


def update_user_status(db: Session, user_id: int, status: str):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail='User doesnot exists')
 
    db_user.status = status
    db_user.is_active = status == "approved"
    db.commit()
    db.refresh(db_user)
    return db_user


def send_reset_email(email: str, reset_token: str):
    SMTP_SERVER = config.SMTP_SERVER
    SMTP_PORT = config.SMTP_PORT
    EMAIL_ADDRESS = config.EMAIL_ADDRESS
    EMAIL_PASSWORD = config.EMAIL_PASSWORD

    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = email
        msg['Subject'] = "Password Reset Request"

        reset_link = f"{config.FRONTEND_URL}/reset-password?token={reset_token}"

        body = f"""
        Hello,

        You have requested to reset your password. Click the link below:

        {reset_link}

        This link will expire in 1 hour.

        If you didn't request this, please ignore.

        Regards,
        Zeex AI
        """

        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()

        return True
    
    except Exception as e:
        print(f"Error sending email: {e}")
        return False



def create_reset_token(db: Session, user_id: int):
    """Create a password reset token"""
    # Generate secure random token
    token = secrets.token_urlsafe(32)
    
    # Set expiration time (1 hour from now)
    expires_at = datetime.utcnow() + timedelta(hours=1)
    
    # Create reset record
    reset_record = models.PasswordReset(
        user_id=user_id,
        token=token,
        expires_at=expires_at
    )
    
    db.add(reset_record)
    db.commit()
    
    return token

import traceback

def request_pass_reset(db: Session, email: str):
    print(f"📩 Called with email: {email}")
    try:
        user = db.query(models.User).filter(models.User.email == email).first()
        print(f"👤 Found user: {user}")

        if not user:
            return {"message": "If this email exists, a reset link will be sent"}

        token = create_reset_token(db, user.id)
        print(f"🔐 Token created: {token}")

        if send_reset_email(email, token):
            return {"message": "Reset email sent"}
        else:
            raise HTTPException(status_code=500, detail="Failed to send email")

    except Exception as e:
        print("❌ Exception:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal server error")


def verify_reset_token(db: Session, token: str):
    """Verify if reset token is valid"""
    reset_record = db.query(models.PasswordReset).filter(
        models.PasswordReset.token == token,
        models.PasswordReset.used == False,
        models.PasswordReset.expires_at > datetime.utcnow()
    ).first()
    
    if not reset_record:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    
    return reset_record

def reset_password(db: Session, token: str, new_password: str):
    """Reset user password using token"""
    # Verify token
    reset_record = verify_reset_token(db, token)
    
    # Get user
    user = db.query(models.User).filter(models.User.id == reset_record.user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update password
    user.password = get_pass(new_password)
    
    # Mark token as used
    reset_record.used = True
    
    db.commit()
    
    return {"message": "Password reset successfully"}