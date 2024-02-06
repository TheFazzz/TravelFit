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
            }
        else:
            return None

    finally:
       if cursor:
           cursor.close()
       if connection:
           connection.close()