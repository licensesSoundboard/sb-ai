from fastapi import FastAPI
from app.api.routes import api_router



app = FastAPI(
    title="AI Framework Backend",
    description="Python AI processing service",
    version="1.0.0"
)

# Include API routes
app.include_router(api_router)

