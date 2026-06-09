from sqlalchemy import Boolean, Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    eco_points = Column(Integer, default=0)
    is_admin = Column(Boolean, default=False)
    
    scans = relationship("Scan", back_populates="owner")

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    object_name = Column(String, index=True)
    carbon_footprint = Column(Float) # kg CO2
    water_footprint = Column(Float) # liters
    energy_consumption = Column(Float) # kWh
    eco_score = Column(Integer) # 0-100
    explanation = Column(String)
    sustainable_alternatives = Column(String)
    estimated_savings = Column(String)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="scans")
