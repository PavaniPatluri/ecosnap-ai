from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ScanBase(BaseModel):
    object_name: str
    carbon_footprint: float
    water_footprint: float
    energy_consumption: float
    eco_score: int
    explanation: str
    sustainable_alternatives: str
    estimated_savings: str
    image_url: Optional[str] = None

class ScanCreate(ScanBase):
    pass

class Scan(ScanBase):
    id: int
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str
    is_admin: bool = False

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    eco_points: int
    scans: List[Scan] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
