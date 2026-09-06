import uuid
from datetime import datetime

from sqlalchemy import DateTime, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.database.base import Base


class CropGuide(Base):
    __tablename__ = "crop_guides"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        nullable=False,
    )
    crop_name: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    introduction: Mapped[str | None] = mapped_column(Text, nullable=True)
    suitable_season: Mapped[str | None] = mapped_column(String(255), nullable=True)
    soil_type: Mapped[str | None] = mapped_column(String(255), nullable=True)
    climate: Mapped[str | None] = mapped_column(String(255), nullable=True)
    seed_selection: Mapped[str | None] = mapped_column(Text, nullable=True)
    irrigation: Mapped[str | None] = mapped_column(Text, nullable=True)
    fertilizer_guide: Mapped[str | None] = mapped_column(Text, nullable=True)
    common_diseases: Mapped[str | None] = mapped_column(Text, nullable=True)
    pest_control: Mapped[str | None] = mapped_column(Text, nullable=True)
    harvesting: Mapped[str | None] = mapped_column(Text, nullable=True)
    storage: Mapped[str | None] = mapped_column(Text, nullable=True)
    market_information: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    def __repr__(self) -> str:
        return f"<CropGuide(id={self.id}, crop_name={self.crop_name})>"
    