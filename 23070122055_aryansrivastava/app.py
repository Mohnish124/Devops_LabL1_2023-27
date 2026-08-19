from flask import Flask
import psycopg2
import os

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ.get('DB_HOST', 'localhost'),
        database=os.environ.get('DB_NAME', 'postgres'),
        user=os.environ.get('DB_USER', 'postgres'),
        password=os.environ.get('DB_PASSWORD', 'postgres')
    )
    return conn

def init_db():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('CREATE TABLE IF NOT EXISTS visits (id serial PRIMARY KEY, message varchar (150) NOT NULL);')
        cur.execute('INSERT INTO visits (message) VALUES (%s)', ('Hello World from Postgres!',))
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print("Could not connect to db:", e)

@app.route('/')
def hello():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT message FROM visits ORDER BY id DESC LIMIT 1;')
        record = cur.fetchone()
        cur.close()
        conn.close()
        if record:
            return f"Hello World! DB says: {record[0]}"
    except Exception as e:
        return f"Hello World! (DB connection failed: {e})"
    return "Hello World!"

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000)
