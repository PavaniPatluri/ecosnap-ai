from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models, schemas, database
from routers.auth import get_current_user
from services.gemini import analyze_image

router = APIRouter(prefix="/scans", tags=["scans"])

@router.post("/", response_model=schemas.Scan)
async def create_scan(
    file: UploadFile = File(...), 
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(database.get_db)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image")
    
    contents = await file.read()
    
    # Analyze with Gemini
    analysis_result = analyze_image(contents, file.content_type)
    
    # Save scan to database
    db_scan = models.Scan(
        object_name=analysis_result.get("object_name", "Unknown"),
        carbon_footprint=analysis_result.get("carbon_footprint", 0),
        water_footprint=analysis_result.get("water_footprint", 0),
        energy_consumption=analysis_result.get("energy_consumption", 0),
        eco_score=analysis_result.get("eco_score", 50),
        explanation=analysis_result.get("explanation", ""),
        sustainable_alternatives=analysis_result.get("sustainable_alternatives", ""),
        estimated_savings=analysis_result.get("estimated_savings", ""),
        owner_id=current_user.id
    )
    
    db.add(db_scan)
    
    # Award points (basic gamification)
    current_user.eco_points += 10
    
    db.commit()
    db.refresh(db_scan)
    
    return db_scan

@router.get("/", response_model=List[schemas.Scan])
def get_scans(skip: int = 0, limit: int = 100, current_user: models.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    scans = db.query(models.Scan).filter(models.Scan.owner_id == current_user.id).offset(skip).limit(limit).all()
    return scans
