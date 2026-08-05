from flask import Flask
import redis

app = Flask(__name__)

try:
    r = redis.Redis(host="redis", port=6379, decode_responses=True)
    r.ping()
    db_status = "Connected"
except Exception:
    db_status = "Not Connected"

@app.route("/")
def home():
    return {
        "message": "Hello from Flask Backend!",
        "redis": db_status
    }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
