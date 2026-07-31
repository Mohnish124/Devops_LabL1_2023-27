from flask import Flask
import psycopg2
import time

app = Flask(__name__)

def get_db_connection():
    while True:
        try:
            conn = psycopg2.connect(
                host="postgres",
                database="hello_db",
                user="postgres",
                password="password"
            )
            return conn
        except Exception:
            print("Database not ready, retrying...")
            time.sleep(2)

@app.route("/")
def home():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            message TEXT
        )
    """)

    cur.execute("""
        INSERT INTO messages (message)
        VALUES ('Hello from Flask + PostgreSQL')
    """)

    conn.commit()

    cur.execute("SELECT * FROM messages")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    return f"Hello World! Data stored in PostgreSQL.<br><br>{rows}"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)