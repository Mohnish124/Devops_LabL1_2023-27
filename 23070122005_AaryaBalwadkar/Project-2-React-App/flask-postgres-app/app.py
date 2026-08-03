from flask import Flask
import psycopg2
import os

app = Flask(__name__)

def get_db_connection():
    # Connect to the database using environment variables
    conn = psycopg2.connect(
        host=os.environ.get("POSTGRES_HOST", "db"),
        database=os.environ.get("POSTGRES_DB", "mydatabase"),
        user=os.environ.get("POSTGRES_USER", "myuser"),
        password=os.environ.get("POSTGRES_PASSWORD", "mypassword")
    )
    return conn

@app.route('/')
def hello():
    try:
        # Test the database connection
        conn = get_db_connection()
        conn.close()
        return "Hello from Flask! Successfully connected to PostgreSQL."
    except Exception as e:
        return f"Failed to connect to database: {str(e)}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)