from pydantic import BaseModel, EmailStr
from typing import Optional


class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    status: str
    is_active: bool


    class Config:
        orm_mode = True


class AdminUserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str


class Status_update(BaseModel):
    status: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class StatusUpdate(BaseModel):
    status: str  # approved / rejected / pending
