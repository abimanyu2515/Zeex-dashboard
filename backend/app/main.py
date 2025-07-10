from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database, auth
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from app.jwt_handler import create_access_token

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
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
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return auth.create_user(db, user)


@app.post('/admin/create-user')
def admin_create(user: schemas.AdminUserCreate, db: Session = Depends(get_db), admin = Depends(auth.get_current_admin)):
    return auth.admin_create_user(db, user)


@app.post('/signin')
def login_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.login_check(db, schemas.UserLogin(email=form_data.username, password=form_data.password))
    access_token = create_access_token(data={'sub': str(user.id), 'email': user.email, 'name': user.name, "role": user.role})
    return {'access_token': access_token, 'token_type': 'bearer', 'role': user.role}


@app.get('/admin/get_all_users')
def get_the_users(db: Session = Depends(get_db), admin = Depends(auth.get_current_admin)):
    return db.query(models.User).all()


@app.put('/admin/update/{user_id}')
def update_user_status(user_id: int, status: str, db: Session = Depends(get_db), admin = Depends(auth.get_current_admin)):
    if status not in ["approved", "rejected", "pending"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    user = auth.update_user_status(db, user_id, status)
    return {"message": f"User status updated to {status}", "user": user}


@app.get('/admin/pending-users')
def get_pending_users(db: Session = Depends(get_db), admin = Depends(auth.get_current_admin)):
    return db.query(models.User).filter(models.User.status == "pending").all()


@app.get("/protected")
def read_protected(user=Depends(auth.get_current_user)):
    return {"message": f"Welcome, {user.name}!"}