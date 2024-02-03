from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str

class RegisterResponse(BaseModel):
    id: int

class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    password: str