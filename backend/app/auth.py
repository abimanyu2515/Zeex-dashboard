from fastapi import HTTPException, Depends
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError

from . import models, schemas, database, config


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
            status="pending",  # New users start with pending status
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
    
    # Check if user is approved
    if db_user.status != "approved" or not db_user.is_active:
        raise HTTPException(status_code=403, detail="Account pending approval. Please contact admin.")
    
    return db_user


def admin_create_user(db: Session, user: schemas.AdminUserCreate):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
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
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.status = status
    user.is_active = status == "approved"
    db.commit()
    db.refresh(user)
    return user