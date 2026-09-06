import uuid
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import generate_refresh_token, get_refresh_token_expiry
from app.models.refresh_token import RefreshToken


async def create_refresh_token(db: AsyncSession, user_id: uuid.UUID) -> RefreshToken:
    token_value = generate_refresh_token()
    new_token = RefreshToken(
        user_id=user_id,
        token=token_value,
        expires_at=get_refresh_token_expiry(),
    )
    db.add(new_token)
    await db.commit()
    await db.refresh(new_token)
    return new_token


async def get_valid_refresh_token(db: AsyncSession, token_value: str) -> RefreshToken | None:
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token == token_value)
    )
    token_record = result.scalar_one_or_none()

    if token_record is None:
        return None
    if token_record.is_revoked:
        return None
    if token_record.expires_at < datetime.now(timezone.utc):
        return None

    return token_record


async def revoke_refresh_token(db: AsyncSession, token_value: str) -> bool:
    result = await db.execute(
        select(RefreshToken).where(RefreshToken.token == token_value)
    )
    token_record = result.scalar_one_or_none()

    if token_record is None:
        return False

    token_record.is_revoked = True
    await db.commit()
    return True


async def revoke_all_user_tokens(db: AsyncSession, user_id: uuid.UUID) -> None:
    result = await db.execute(
        select(RefreshToken).where(
            RefreshToken.user_id == user_id,
            RefreshToken.is_revoked == False,  # noqa: E712
        )
    )
    tokens = result.scalars().all()

    for token_record in tokens:
        token_record.is_revoked = True

    await db.commit()