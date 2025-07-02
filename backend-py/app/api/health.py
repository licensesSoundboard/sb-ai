# app/api/health.py
from fastapi import APIRouter
from typing import Dict, Any
from datetime import datetime

router = APIRouter()

@router.get("/")
async def basic_health() -> Dict[str, Any]:
    """Basic health check"""
    return {
        "status": "healthy",
        "service": "ai-backend-py",
        "timestamp": datetime.utcnow().isoformat(),
        "environment": "development"  # hardcode for now
    }

@router.get("/detailed")
async def detailed_health() -> Dict[str, Any]:
    """Detailed health check"""
    return {
        "status": "healthy",
        "service": "ai-backend-py",
        "timestamp": datetime.utcnow().isoformat(),
        "environment": "development",
        "dependencies": {
            "basic_check": {"healthy": True, "status": "ok"}
        }
    }