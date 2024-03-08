import os

def get_blob_connection_string():
    return os.getenv("BLOB_CONNECTION_STRING")
