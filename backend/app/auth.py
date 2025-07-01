from fastapi import HTTPException, Depends
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError

from . import models, schemas, database


SECRET_KEY = "3f7a242e9dc04114faaf2d0e7f5a0693ef21b420b2b7fbf42b2c490665ca8b41"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_pass(password: str):
    return pwd_context.hash(password)

def verify_pass(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_user(db: Session, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if db_user:
        raise HTTPException(status_code=400, detail="User Exists")
    
    else:
        db_user = models.User(
        name=user.name,
        email=user.email,
        password=get_pass(user.password)
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

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
    return db_user


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token or expired")

    user = db.query(models.User).filter(models.User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
