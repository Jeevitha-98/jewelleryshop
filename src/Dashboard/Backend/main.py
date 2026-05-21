import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine, Base
import models

# Safe modular package routing subfolder imports
from routes import authroutes, Supplier

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="Supplier & Vendor System API", lifespan=lifespan)

# ==============================================================================
# BROADENED CORS POLICIES RULES GRID (Fixes the network error loop)
# ==============================================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Permits GET, POST, PUT, DELETE, PATCH actions natively
    allow_headers=["*"],  # Permits Authorization token header strings safely
)

# Provision local static content uploads directories
os.makedirs("uploads/products", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Dynamic modular application router hook registries
app.include_router(authroutes.router, prefix="/auth")
app.include_router(Supplier.router)

@app.get("/")
def root():
    return {"status": "success", "message": "Backend platform running successfully"}
