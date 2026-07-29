from flask import Flask
import psycopg2
import time

app = Flask(__name__)

print("User authentication feature branch initialized.")


def get_db_connection():

    while True:
        try:
            conn = psycopg2.connect(
                host="db",
                database="hello_db",
                user="postgres",
                password="password"
            )
            return conn

        except Exception:
            print("Database not ready, waiting...")
            time.sleep(2)


@app.route("/")
def home():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages(
            id SERIAL PRIMARY KEY,
            message TEXT
        )
    """)


    cursor.execute(
        "INSERT INTO messages(message) VALUES(%s)",
        ("Hello from Flask + PostgreSQL",)
    )


    conn.commit()

    cursor.close()
    conn.close()

    return "Hello World! Data stored in PostgreSQL."


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )