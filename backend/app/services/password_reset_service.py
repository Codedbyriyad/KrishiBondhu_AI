import uuid
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import generate_password_reset_token, get_password_reset_token_expiry
from app.models.password_reset_token import PasswordResetToken


async def create_password_reset_token(db: AsyncSession, user_id: uuid.UUID) -> PasswordResetToken:
    token_value = generate_password_reset_token()
    new_token = PasswordResetToken(
        user_id=user_id,
        token=token_value,
        expires_at=get_password_reset_token_expiry(),
    )
    db.add(new_token)
    await db.commit()
    await db.refresh(new_token)
    return new_token


async def get_valid_password_reset_token(
    db: AsyncSession, token_value: str
) -> PasswordResetToken | None:
    result = await db.execute(
        select(PasswordResetToken).where(PasswordResetToken.token == token_value)
    )
    token_record = result.scalar_one_or_none()

    if token_record is None:
        return None
    if token_record.is_used:
        return None
    if token_record.expires_at < datetime.now(timezone.utc):
        return None

    return token_record


async def mark_token_as_used(db: AsyncSession, token_record: PasswordResetToken) -> None:
    token_record.is_used = True
    await db.commit()