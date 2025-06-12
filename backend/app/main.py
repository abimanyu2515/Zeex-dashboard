from fastapi import FastAPI, Depends, APIRouter
from sqlalchemy.orm import Session
from app import models, schemas, database, auth
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm

models.Base.metadata.create_all(bind = database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post('/signup')
def signup(user: schemas.UserCreate, db: Session=Depends(get_db)):
    return auth.create_user(db, user)


@app.post('/signin')
def signin(user: schemas.UserLogin, db: Session=Depends(get_db)):
    return auth.login_check(db, user)


@app.post('/token')
def login_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.login_check(db, schemas.UserLogin(email = form_data.username, password = form_data.password))
    access_token = auth.create_access_token(data={'sub' : str(user.id)})
    return {'access_token' : access_token, 'token_type' : 'bearer'}

@app.get("/protected")
def read_protected(user=Depends(auth.get_current_user)):
    return {"message": f"Welcome, {user.name}!"}
