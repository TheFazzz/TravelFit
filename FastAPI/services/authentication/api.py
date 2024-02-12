import uvicorn
from fastapi import APIRouter, Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import bcrypt
from typing import List
from pydantic import BaseModel
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os
import psycopg2

from models.models import *
from database.database import *

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")  # Get the secret key
ALGORITHM = os.getenv("ALGORITHM")  # Get the algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))  # Get the expiration time

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return password_context.hash(password)

def verify_password(plain_password, hashed_password):
    return password_context.verify(plain_password, hashed_password)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise credentials_exception

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

@router.post("/token")
async def login_for_access_token(
    user: LoginRequest,
    db: tuple = Depends(get_db_connection)
    ):
    stored_user = get_user_by_email(user.email, db)
    if stored_user and verify_password(user.password, stored_user["password"]):
        access_token = create_access_token(data={"sub": user.email})
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")


@router.post("/register")
async def register(
    req: RegisterRequest,
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
    hashed_password = hash_password(req.password)
    try:
        cursor.execute(
            """
            INSERT INTO users (firstName, lastName, email, password_hash)
            VALUES (%s, %s, %s, %s)
            RETURNING id
            """,
            (req.first_name, req.last_name, req.email, hashed_password),
        )
        connection.commit()  # Commit the transaction
        user_row = cursor.fetchone()

        assert user_row is not None
        id = user_row[0]  # Access the id directly from the row

        
        user_row = get_user(id, db) 

        return ReturnIdResponse(id=id)

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

@router.get("/users")
async def all_users(
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
    
    try:
        cursor.execute(
            """
            SELECT * FROM users
            """
        )
        users = cursor.fetchall()

        # Convert the result to a list of dictionaries
        user_list = [
            {
                "id": user[0],
                "firstName": user[1],
                "lastName": user[2],
                "email": user[3],
                "password_hash": user[4]
                # Add other fields as needed
            }
            for user in users
        ]

        return JSONResponse(content={"users": user_list}, status_code=200)

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
