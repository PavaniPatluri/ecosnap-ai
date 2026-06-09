from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

import models, schemas, database
from routers.auth import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=schemas.User)
def read_user_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.get("/leaderboard", response_model=List[schemas.User])
def get_leaderboard(limit: int = 10, db: Session = Depends(database.get_db)):
    users = db.query(models.User).order_by(models.User.eco_points.desc()).limit(limit).all()
    return users
