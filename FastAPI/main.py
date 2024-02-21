import uvicorn
import googlemaps
from fastapi import Depends, FastAPI, HTTPException, APIRouter, UploadFile, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import List
from pydantic import BaseModel
from psycopg2.extensions import AsIs
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

from database.database import *
from models.models import *
from services.authentication.api import get_current_user
import services.authentication.api
import os


app = FastAPI()
app.include_router(services.authentication.api.router)

# Load environment variables
blob_connection_string = os.getenv("BLOB_CONNECTION_STRING")

# API endPoints
@app.get("/")
async def root():
    return {"message": "TravelFitAPI"}


@app.get("/gyms/city/{city_name}")
def get_gyms_in_city(
    city_name: str,
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
            (city_name,)
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
    address = f"{gym.address1}, {gym.city}, {gym.state}, {gym.zipcode}"

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

# add gym photos
@app.post("/gyms/{gym_id}/photos/add")
async def upload_photos(
    gym_id: int, 
    files: List[UploadFile] = File(...)
    ):
    container_name = f"gym-photos"
    blob_service_client = BlobServiceClient.from_connection_string(blob_connection_string)
    container_client = blob_service_client.get_container_client(container_name)

    # Define the virtual directory
    virtual_directory_name = f"gym-{gym_id}"

    # Check if the container exists, create if not
    if not container_client.exists():
        container_client.create_container()

    for file in files:
        try:
            blob_name = f"{virtual_directory_name}/{file.filename}"
            blob_client = container_client.get_blob_client(blob_name)
            blob_client.upload_blob(file.file)

            db = get_db_connection()

            # Insert the photo path into the database
            photo_url = f"https://travelfitstorage.blob.core.windows.net/{container_name}/{blob_name}"
            insert_gym_photo_into_database(gym_id, photo_url, db)

        except Exception as e:
            print(f"Error uploading photo or inserting into database: {e}")

    return {"message": "Photos uploaded successfully"}

from fastapi import HTTPException

# delete gym photos
@app.delete("/gyms/{gym_id}/photos/{photo_id}")
async def delete_photo(
    gym_id: int,
    photo_id: int
):
    try:
        db = get_db_connection()
        # Check if the photo exists in the database
        photo = get_photo_by_id(photo_id, db)
        if not photo:
            raise HTTPException(status_code=404, detail="Photo not found in database")

        file_name = photo[2].split("/")[-1]
        # Construct the blob name for the photo to be deleted
        blob_name = f"gym-{gym_id}/{file_name}"

        # Get the container client
        container_name = "gym-photos"
        blob_service_client = BlobServiceClient.from_connection_string(blob_connection_string)
        container_client = blob_service_client.get_container_client(container_name)

        # Check if the blob exists in Azure Blob Storage
        blob_client = container_client.get_blob_client(blob_name)
        if not blob_client.exists():
            raise HTTPException(status_code=404, detail="Photo not found in blob storage")

        # Delete the photo from Azure Blob Storage
        blob_client.delete_blob()

        db = get_db_connection()
        # Delete the photo from the database
        delete_gym_photo(photo_id, db)

        return {"message": "Photo deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete photo: {e}")
    
# get gym photos for gym by gym_id
@app.get("/gyms/{gym_id}/photos", response_model=List[dict])
async def get_gym_photos(
    gym_id: int, 
    db: tuple = Depends(get_db_connection)
):
    connection, cursor = db    
    try:
        cursor.execute(
            """
            SELECT id, photo_url
            FROM GymPhotos
            WHERE gym_id = %s
            """,
            (gym_id,)
        )
        photos = cursor.fetchall()

        return [{"id": photo[0], "photo_url": photo[1]} for photo in photos]
        
    except psycopg2.Error as e:
        raise HTTPException(status_code=500, detail="Failed to fetch photos for the gym")
    finally:
        cursor.close()
        connection.close()
    


