from typing import List, Optional
from pydantic import BaseModel, Field, validator
from decimal import Decimal


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

class GymUpdateRequest(BaseModel):
    gym_name: Optional[str] = None
    gym_description: Optional[str] = None
    address1: Optional[str] = None
    address2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zipcode: Optional[str] = None
    amenities: Optional[List[str]] = Field(default_factory=list)
    hours_of_operation: Optional[dict] = None

class PassOptionCreateRequest(BaseModel):
    pass_name: str
    price: Decimal = Field(default=0, max_digits=5, decimal_places=2)
    duration: str
    description: Optional[str] = None 

    @validator('price')
    def validate_price(cls, v):
        if v <= 0:
            raise ValueError("Price must be greater than 0")
        return v

class PassOptionResponse(BaseModel):
    id: int
    gym_id: int
    pass_name: str
    price: Decimal
    duration: str
    description: str  
        
    class Config:
        orm_mode = True