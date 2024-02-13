from typing import List, Optional
from pydantic import BaseModel, Field

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str

class ReturnIdResponse(BaseModel):
    id: int

class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    password: str

class GymCreateRequest(BaseModel):
    gym_name: str
    gym_description: str
    address1: str
    address2: Optional[str] = None
    city: str
    state: str
    zipcode: str
    amenities: Optional[List[str]] = Field(default_factory=list)
    hours_of_operation: Optional[dict] = None

    