from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from ..core.security import create_access_token
from ..models.user import UserCreate, Token
from ..services.auth_service import create_user, authenticate_user

router = APIRouter()

@router.post("/signup", response_model=Token)
async def signup(user: UserCreate):
    db_user = await create_user(user)
    if db_user is None:
        raise HTTPException(status_code=400, detail="Email already registered")
    access_token = create_access_token(data={"sub": user.email})
    return Token(access_token=access_token, token_type="bearer")

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user["email"]})
    return Token(access_token=access_token, token_type="bearer")