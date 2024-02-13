import uvicorn
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import List
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database.database import *
from models.models import *
import services.authentication.api


app = FastAPI()
app.include_router(services.authentication.api.router)

# API endPoints
@app.get("/")
async def root():
    return {"message": "TravelFitAPI"}
""" 
# get pass options for specific gym 
@app.get("/gyms/{gym_id}/guest-pass-options")
def get_guest_pass_options(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):

# post pass options for specific gym
@app.post("/gyms/{gym_id}/guest-pass-options")
def add_guest_pass_options(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):

# delete pass options for specific gym
@app.delete("/gyms/{gym_id}/guest-pass-options")
def delete_guest_pass_options(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):

# user purchase guest pass (user_id needs to be inlcude?)
@app.post("/gyms/{gym_id}/guest-pass-options/{option_id}/purchase
")
def purchase_guest_passes(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):

# gyms update hours of operation
@app.patch("/gyms/{gym_id}/update-hours
")
def update_operation_hours(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):

# gyms get photos
@app.get("/gym-photos/{gym_id}
")
def get_gym_photos(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):

# gyms post photos
@app.post("/gym-photos
")
def add_gym_photos(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):

# gyms delete photos
@app.patch("/gym-photos/{gym_id}/{photo_id}/
")
def delete_gym_photos(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):



////////////////////////////Whole lotta gang///////////////////////////////////
# Get gym listings 
@app.get("/gym-listings/{gym_id}
")
def get_gym_listings(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):

# Post purchase guest passes 
@app.post("/guest-purchase-pass
")
def guest_purcahse_pass(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):

# Get user location
@app.get("/user-location
")
def get_user-location(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):

# Get gym listings 
@app.get("/gym-listings/local-gyms
")
def get_local-gyms(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):
"""
