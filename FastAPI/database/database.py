from fastapi import Depends
import psycopg2
import os


def get_db_connection():
    try:
        database_name = os.getenv("DATABASE_NAME")
        user = os.getenv("DB_USER")
        password = os.getenv("DB_PASSWORD")
        host = os.getenv("DB_HOST")
        port = os.getenv("DB_PORT")
        ssl = os.getenv("DB_SSL")

        connection = psycopg2.connect(
            database=database_name, user=user, password=password, host=host, port=port, sslmode=ssl
        )

        cursor = connection.cursor()

        return connection, cursor

    except Exception as e:
        raise e


def get_user(user_id, db):
    connection, cursor = db
    try:
        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        user_row = cursor.fetchone()
        return user_row
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

async def get_user_by_email(email: str, db):
    """Retrieves a user with the specified email from the database."""
    connection, cursor = db

    try:
        cursor.execute("SELECT * FROM Users WHERE email = %s", (email,))
        user_data = cursor.fetchone()

        if user_data:
            return {
                "id": user_data[0],
                "firstName": user_data[1],
                "lastName": user_data[2],
                "email": user_data[3],
                "password_hash": user_data[4],
            }
        else:
            return None

    finally:
       if cursor:
           cursor.close()
       if connection:
           connection.close()

def insert_gym_photo_into_database(gym_id: int, photo_url: str, db):
    
    connection, cursor = db

    try:
        cursor.execute(
            """
            INSERT INTO GymPhotos (gym_id, photo_url)
            VALUES (%s, %s)
            RETURNING id
            """,
            (gym_id, photo_url)
        )
        photo_id = cursor.fetchone()[0]
        connection.commit()
        return photo_id
    except psycopg2.Error as e:
        connection.rollback()
        raise e
    finally:
        cursor.close()
        connection.close()

def get_photo_by_id(photo_id: int, db):
    connection, cursor = db
    try:
        cursor.execute("SELECT * FROM GymPhotos WHERE id = %s", (photo_id,))
        return cursor.fetchone()
    except Exception as e:
        raise e
    finally:
        cursor.close()
        connection.close()

def delete_gym_photo(photo_id: int, db):
    connection, cursor = db
    try:
        cursor.execute("DELETE FROM GymPhotos WHERE id = %s", (photo_id,))
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise e
    finally:
        cursor.close()
        connection.close()
