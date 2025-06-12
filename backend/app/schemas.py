from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    name:str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None