from fastapi import FastAPI
from app.api.routes import router as api_router

app = FastAPI()

# Mount your API routes
app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "FastAPI backend is running v2"}
