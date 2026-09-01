# app.py
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Pulled from Secret via env var
JWT_SECRET = os.environ.get("JWT_SECRET", "not-set")

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json(force=True)
    username = data.get("username")
    password = data.get("password")
    if username == "admin" and password == "admin123":
        return jsonify({"status": "success", "token": f"fake-jwt-signed-with-{JWT_SECRET[:4]}..."})
    return jsonify({"status": "failed"}), 401

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "up"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)