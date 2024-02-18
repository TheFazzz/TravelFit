import uvicorn
import googlemaps
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import List
from pydantic import BaseModel
from psycopg2.extensions import AsIs

from database.database import *
from models.models import *
from services.authentication.api import get_current_user
import services.authentication.api
import os


app = FastAPI()
app.include_router(services.authentication.api.router)

# API endPoints
@app.get("/")
async def root():
    return {"message": "TravelFitAPI"}


@app.get("/gyms/{city}")
def get_gyms_in_city(
    city: str,
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
    
    try:
        cursor.execute(
            """
            SELECT id, gym_name, description, address1, address2, city, state, zipcode, longitude, latitude, location, amenities, hours_of_operation
            FROM gyms
            WHERE city = %s
            """,
            (city,)
        )
        gyms = cursor.fetchall()

        if not gyms:
            raise HTTPException(status_code=404, detail=f"No gyms found in {city}")

        gyms_info = []
        for gym in gyms:
            gym_info = {
                "id": gym[0],
                "gym_name": gym[1],
                "description": gym[2],
                "address1": gym[3],
                "address2": gym[4] if gym[4] is not None else None,
                "city": gym[5],
                "state": gym[6],
                "zipcode": gym[7],
                "longitude": gym[8],
                "latitude": gym[9],
                "location": gym[10],
                "amenities": gym[11] if gym[11] is not None else [],
                "hours_of_operation": gym[12] if gym[12] is not None else {}
            }
            gyms_info.append(gym_info)

        return gyms_info

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch gym information")
    finally:
        cursor.close()
        connection.close()


# post gym listing
@app.post("/gyms")
def add_gym_listing(
    gym: GymCreateRequest,
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
        # Construct the address string
    address = f"{gym.address}, {gym.city}, {gym.state}, {gym.zipcode}"

    # Call Google Maps API to geocode the address
    api_key = os.getenv("GOOGLE_API_KEY")
    gmaps = googlemaps.Client(key=api_key)
    geocode_result = gmaps.geocode(address)

    # Extract latitude and longitude from geocode result
    if geocode_result:
        latitude = geocode_result[0]['geometry']['location']['lat']
        longitude = geocode_result[0]['geometry']['location']['lng']
    else:
        return None
    
    point = f"POINT({longitude} {latitude})"

    try:
        cursor.execute(
            """
            INSERT INTO gyms (gym_name, description, address1, city, state, zipcode, longitude, latitude, location)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, ST_GeographyFromText(%s))
            RETURNING id
            """,
            (gym.gym_name, gym.gym_description, gym.address1, gym.city, gym.state, gym.zipcode, longitude, latitude, point),
        )
        connection.commit()  # Commit the transaction
        gym_row = cursor.fetchone()

        assert gym_row is not None
        id = gym_row[0]  # Access the id directly from the row 

        return ReturnIdResponse(id=id)

    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

# get gym by gym_id
@app.get("/gyms/{gym_id}")
def get_gym_by_id(
    gym_id: int,
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
    try:
        cursor.execute(
            """
            SELECT id, gym_name, description, address1, address2, city, state, zipcode, longitude, latitude, location, amenities, hours_of_operation
            FROM gyms
            WHERE id = %s
            """,
            (gym_id,)
        )
        gym = cursor.fetchone()

        if gym is None:
            raise HTTPException(status_code=404, detail="Gym not found")

        # Construct a dictionary to represent the gym
        gym_info = {
            "id": gym[0],
            "gym_name": gym[1],
            "description": gym[2],
            "address1": gym[3],
            "address2": gym[4] if gym[4] is not None else None,
            "city": gym[5],
            "state": gym[6],
            "zipcode": gym[7],
            "longitude": gym[8],
            "latitude": gym[9],
            "location": gym[10],
            "amenities": gym[11] if gym[11] is not None else [],
            "hours_of_operation": gym[12] if gym[12] is not None else {}
        }

        # Optionally, fetch and include gym photos here, still deciding

        return gym_info

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch gym information")

    finally:
        cursor.close()
        connection.close()


@app.put("/gyms/{gym_id}")
def update_gym_info(
    gym_id: int,
    update_request: GymUpdateRequest,  
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
    try:
        # Check if the gym exists
        cursor.execute("SELECT id FROM gyms WHERE id = %s", (gym_id,))
        gym = cursor.fetchone()
        if not gym:
            raise HTTPException(status_code=404, detail="Gym not found")

        # Construct the SQL query for updating gym information
        update_query = "UPDATE gyms SET"
        update_values = []

        if update_request.gym_name:
            update_query += " gym_name = %s,"
            update_values.append(update_request.gym_name)

        if update_request.description:
            update_query += " gym_description = %s,"
            update_values.append(update_request.gym_description)

        if update_request.address:
            update_query += " address1 = %s,"
            update_values.append(update_request.address1)

        if update_request.address:
            update_query += " address2 = %s,"
            update_values.append(update_request.address2)

        if update_request.city:
            update_query += " city = %s,"
            update_values.append(update_request.city)

        if update_request.state:
            update_query += " state = %s,"
            update_values.append(update_request.state)

        if update_request.zipcode:
            update_query += " zipcode = %s,"
            update_values.append(update_request.zipcode)

        if update_request.amenities:
            update_query += " amenities = %s,"
            update_values.append(update_request.amenities)

        if update_request.hours_of_operation:
            update_query += " hours_of_operation = %s,"
            update_values.append(update_request.hours_of_operation)

        # Remove trailing comma
        update_query = update_query.rstrip(",")

        update_query += " WHERE id = %s"
        update_values.append(gym_id)

        # Execute the update query
        cursor.execute(update_query, update_values)

        connection.commit()

        return {"message": "Gym information updated successfully"}

    except Exception as e:
        # Rollback changes and raise HTTPException
        connection.rollback()
        raise HTTPException(status_code=500, detail="Failed to update gym information")

    finally:
        cursor.close()
        connection.close()


# post pass options for specific gym
@app.post("/gyms/{gym_id}/guest-pass-options")
def add_guest_pass_options(
    gym_id: int,
    req: PassOptionCreateRequest,
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
    try:
        # Construct the SQL query
        cursor.execute(
            """
            INSERT INTO passoptions (gym_id, pass_name, price, duration, description)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
            """,
            (gym_id, req.pass_name, req.price, req.duration, req.description)
        )
        
        # Retrieve ID of created entry
        pass_option_id = cursor.fetchone()[0]
        
        # Commit to db
        connection.commit()
        
        return {"pass_option_id": pass_option_id}
    
    except Exception as e:
        # Handle exceptions
        connection.rollback()
        raise HTTPException(status_code=500, detail="Failed to add guest pass option")

    finally:
        # Close the cursor and connection
        cursor.close()
        connection.close()

@app.get("/gyms/{gym_id}/guest-pass-options", response_model=List[PassOptionResponse])
def get_guest_pass_options(
    gym_id: int,
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
    try:
        cursor.execute(
            """
            SELECT id, gym_id, pass_name, price, duration, description
            FROM passoptions
            WHERE gym_id = %s
            """,
            (gym_id,)
        )
        # Fetch all rows
        pass_options = cursor.fetchall()
        
        # Commit to DB
        connection.commit()

        # Convert each tuple into a dictionary
        pass_option_dicts = []
        for pass_option in pass_options:
            pass_option_dict = {
                "id": pass_option[0],
                "gym_id": pass_option[1],
                "pass_name": pass_option[2],
                "price": pass_option[3],
                "duration": pass_option[4],
                "description": pass_option[5]
            }
            pass_option_dicts.append(pass_option_dict)
        
        # Return the pass options
        return pass_option_dicts
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch guest pass options")

    finally:
        cursor.close()
        connection.close()

@app.delete("/gyms/{gym_id}/guest-pass-options/{pass_option_id}")
def delete_guest_pass_option(
    gym_id: int,
    pass_option_id: int,
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
    try:
        # Check if the pass option exists and is associated with the specified gym
        cursor.execute(
            """
            SELECT id
            FROM passoptions
            WHERE id = %s AND gym_id = %s
            """,
            (pass_option_id, gym_id)
        )
        pass_option = cursor.fetchone()

        if not pass_option:
            raise HTTPException(status_code=404, detail="Pass option not found for this gym")

        # Delete pass option
        cursor.execute(
            """
            DELETE FROM passoptions
            WHERE id = %s
            """,
            (pass_option_id,)
        )

        # Commit to DB
        connection.commit()

        return {"message": "Pass option deleted successfully"}

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail="Failed to delete pass option")

    finally:
        cursor.close()
        connection.close()@app.delete("/gyms/{gym_id}/guest-pass-options/{pass_option_id}")

@app.delete("/gyms/{gym_id}")
def delete_gym(
    gym_id: int,
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
    try:
        # Check if exist
        cursor.execute(
            """
            SELECT id
            FROM gyms
            WHERE id = %s 
            """,
            (gym_id,)
        )
        gym_listing = cursor.fetchone()

        if not gym_listing:
            raise HTTPException(status_code=404, detail="No gym found for this ID")

        # Delete gym
        cursor.execute(
            """
            DELETE FROM gyms
            WHERE id = %s
            """,
            (gym_id,)
        )

        # Commit to DB
        connection.commit()

        return {"message": "Gym deleted successfully"}

    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail="Failed to delete Gym")

    finally:
        cursor.close()
        connection.close()

@app.post("/gyms/{gym_id}/guest-passes/purchase")
def purchase_guest_pass(
    gym_id: int,
    pass_option_id: int,  # ID of the guest pass option being purchased
    user: dict = Depends(get_current_user),  # get the current user
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db
    
    try:
        
        user_id = int(user["sub"])
        # Insert the guest pass purchase into the database
        cursor.execute(
            """
            INSERT INTO GuestPassPurchases (user_id, gym_id, pass_option_id)
            VALUES (%s, %s, %s)
            RETURNING id
            """,
            (user_id, gym_id, pass_option_id)
        )
        purchase_id = cursor.fetchone()[0]
        connection.commit()
        return {"message": "Guest pass purchased successfully", "purchase_id": purchase_id}
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail="Failed to purchase guest pass")
    finally:
        cursor.close()
        connection.close()
""" 
# user purchase guest pass (user_id needs to be inlcude?)
@app.post("/gyms/{gym_id}/guest-pass-options/{option_id}/purchase
")
def purchase_guest_passes(
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
"""
