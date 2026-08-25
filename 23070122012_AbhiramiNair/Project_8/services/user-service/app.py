from flask import Flask, jsonify

app = Flask(__name__)

USERS = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
]


@app.get("/health")
def health():
    return jsonify({"service": "user-service", "status": "healthy"})


@app.get("/users")
def users():
    return jsonify(USERS)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081)
