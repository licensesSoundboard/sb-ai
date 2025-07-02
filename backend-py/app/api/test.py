# app/api/test.py
from fastapi import APIRouter
from typing import Dict, Any
from datetime import datetime

router = APIRouter()

@router.get("/")
async def basic_test() -> Dict[str, Any]:
    """Basic test endpoint"""
    return {
        "message": "Hello from Python service!",
        "status": "working",
        "service": "backend-py",
        "timestamp": datetime.utcnow().isoformat()
    }

@router.get("/capabilities")
async def test_capabilities() -> Dict[str, Any]:
    """Test endpoint showing AI capabilities"""
    return {
        "message": "AI capabilities test",
        "status": "working",
        "service": "backend-py",
        "capabilities": [
            "Document processing",
            "LLM integration",
            "Vector embeddings",
            "AI workflows"
        ],
        "timestamp": datetime.utcnow().isoformat()
    }

@router.get("/echo/{message}")
async def echo_test(message: str) -> Dict[str, Any]:
    """Echo test with path parameter"""
    return {
        "message": f"Echo: {message}",
        "original": message,
        "service": "backend-py",
        "timestamp": datetime.utcnow().isoformat()
    }

@router.post("/echo")
async def echo_post_test(data: Dict[str, Any]) -> Dict[str, Any]:
    """Echo test with POST data"""
    return {
        "message": "POST echo test successful",
        "received_data": data,
        "service": "backend-py",
        "timestamp": datetime.utcnow().isoformat()
    }