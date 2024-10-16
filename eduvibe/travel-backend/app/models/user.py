from pydantic import BaseModel, EmailStr

class UserInDB(BaseModel):
    username: str
    email: EmailStr
    hashed_password: str

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str