from fastapi import APIRouter
from app.api.health import router as health_router
from app.api.test import router as test_router


api_router = APIRouter()

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "AI Framework Backend", "status": "running"}


# Include endpoint routers
api_router.include_router(health_router, prefix="/health", tags=["health"])
api_router.include_router(test_router, prefix="/test", tags=["test"])
