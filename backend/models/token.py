from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .base import Base


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    token_hash = Column(String, nullable=False, unique=True)
    jti = Column(String, nullable=False, unique=True)

    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.now())
    revoked = Column(Boolean, default=False)

    user = relationship("User")
