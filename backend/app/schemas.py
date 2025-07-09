from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    name:str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
<<<<<<< HEAD
    email: str
    role: str
=======
    email: EmailStr
    role: str
    status: str
    is_active: bool

    
>>>>>>> fc3b24a (Your message about what you changed)
    class Config:
        orm_mode = True


<<<<<<< HEAD
=======
class AdminUserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str


class Status_update(BaseModel):
    status: str


>>>>>>> fc3b24a (Your message about what you changed)
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None