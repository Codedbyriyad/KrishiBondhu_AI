from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_active_user
from app.core.security import create_access_token
from app.database.session import get_db
from app.models.user import User
from app.schemas.user import (
    AccessTokenResponse,
    ForgotPasswordRequest,
    MessageResponse,
    RefreshTokenRequest,
    ResetPasswordRequest,
    Token,
    UserCreate,
    UserLogin,
    UserRead,
)
from app.services.password_reset_service import (
    create_password_reset_token,
    get_valid_password_reset_token,
    mark_token_as_used,
)
from app.services.token_service import (
    create_refresh_token,
    get_valid_refresh_token,
    revoke_refresh_token,
)
from app.services.user_service import (
    authenticate_user,
    create_user,
    get_user_by_email,
    get_user_by_id,
    update_user_password,
)

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)) -> UserRead:
    existing_user = await get_user_by_email(db, user_in.email)
    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists.",
        )

    new_user = await create_user(db, user_in)
    return new_user


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: AsyncSession = Depends(get_db)) -> Token:
    user = await authenticate_user(db, credentials.email, credentials.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account is inactive.",
        )

    access_token = create_access_token(subject=str(user.id))
    refresh_token_record = await create_refresh_token(db, user.id)

    return Token(access_token=access_token, refresh_token=refresh_token_record.token)


@router.post("/refresh", response_model=AccessTokenResponse)
async def refresh_access_token(
    payload: RefreshTokenRequest, db: AsyncSession = Depends(get_db)
) -> AccessTokenResponse:
    token_record = await get_valid_refresh_token(db, payload.refresh_token)
    if token_record is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token.",
        )

    user = await get_user_by_id(db, token_record.user_id)
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive.",
        )

    new_access_token = create_access_token(subject=str(user.id))
    return AccessTokenResponse(access_token=new_access_token)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(payload: RefreshTokenRequest, db: AsyncSession = Depends(get_db)) -> None:
    await revoke_refresh_token(db, payload.refresh_token)


@router.get("/me", response_model=UserRead)
async def read_current_user(current_user: User = Depends(get_current_active_user)) -> UserRead:
    return current_user


@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password(
    payload: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)
) -> MessageResponse:
    user = await get_user_by_email(db, payload.email)

    if user is not None:
        reset_token = await create_password_reset_token(db, user.id)
        # TODO: এখানে পরে email পাঠানোর logic যোগ হবে (SMTP/SendGrid ইত্যাদি)
        print(f"[DEV ONLY] Password reset token for {user.email}: {reset_token.token}")

    return MessageResponse(
        message="If an account with this email exists, a password reset link has been sent."
    )


@router.post("/reset-password", response_model=MessageResponse)
async def reset_password(
    payload: ResetPasswordRequest, db: AsyncSession = Depends(get_db)
) -> MessageResponse:
    token_record = await get_valid_password_reset_token(db, payload.token)
    if token_record is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token.",
        )

    user = await get_user_by_id(db, token_record.user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found.",
        )

    await update_user_password(db, user, payload.new_password)
    await mark_token_as_used(db, token_record)

    return MessageResponse(message="Password has been reset successfully.")