from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

import models, database
from .auth import get_current_user

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
)

def require_admin(current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user

@router.get("/stats")
def get_global_stats(db: Session = Depends(database.get_db), current_user: models.User = Depends(require_admin)):
    total_users = db.query(models.User).count()
    total_scans = db.query(models.Scan).count()
    
    total_co2 = db.query(func.sum(models.Scan.carbon_footprint)).scalar() or 0.0
    total_water = db.query(func.sum(models.Scan.water_footprint)).scalar() or 0.0
    
    avg_eco_score = db.query(func.avg(models.Scan.eco_score)).scalar() or 0.0
    
    return {
        "total_users": total_users,
        "total_scans": total_scans,
        "total_co2": round(total_co2, 2),
        "total_water": round(total_water, 2),
        "avg_eco_score": round(avg_eco_score, 1)
    }

@router.get("/users")
def get_all_users(db: Session = Depends(database.get_db), current_user: models.User = Depends(require_admin)):
    users = db.query(models.User).all()
    return [{"id": u.id, "username": u.username, "email": u.email, "eco_points": u.eco_points, "is_admin": u.is_admin} for u in users]

@router.get("/scans")
def get_recent_scans(db: Session = Depends(database.get_db), current_user: models.User = Depends(require_admin)):
    scans = db.query(models.Scan).order_by(models.Scan.created_at.desc()).limit(100).all()
    return scans
