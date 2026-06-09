import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from database import engine, Base
from routers import auth, scans, users, admin

load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="EcoSnap AI API")

# Configure CORS for frontend access
origins = [
    "http://localhost:5173", # Vite default
    "http://127.0.0.1:5173",
    os.getenv("FRONTEND_URL", "http://localhost:5173") # Production frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(scans.router)
app.include_router(users.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to EcoSnap AI API"}
