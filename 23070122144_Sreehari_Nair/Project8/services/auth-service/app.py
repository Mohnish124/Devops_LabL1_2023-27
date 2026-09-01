import os
from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

PORT = int(os.environ.get("PORT", 5001))
DB_HOST = os.environ.get("DB_HOST", "mongodb-service")
DB_PORT = int(os.environ.get("DB_PORT", 27017))
DB_NAME = os.environ.get("DB_NAME", "ecommerce_db")
DB_USER = os.environ.get("DB_USER", "admin")
DB_PASS = os.environ.get("DB_PASS", "secretpassword")
JWT_SECRET = os.environ.get("JWT_SECRET", "supersecretjwtkey")
TOKEN_EXPIRY = os.environ.get("TOKEN_EXPIRY", "3600s")

def get_db():
    try:
        mongo_uri = f"mongodb://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/?authSource=admin"
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=2000)
        client.server_info() 
        return client[DB_NAME]
    except Exception as e:
        return None

@app.route('/health', methods=['GET'])
def health():
    db = get_db()
    db_status = "connected" if db is not None else "disconnected (check DB / credentials)"
    return jsonify({
        "status": "healthy",
        "service": "auth-service",
        "database": db_status,
        "config": {
            "token_expiry": TOKEN_EXPIRY,
            "port": PORT
        }
    }), 200

@app.route('/api/auth/users', methods=['GET'])
def get_users():
    db = get_db()
    users = [
        {"id": 1, "username": "admin", "role": "Administrator", "status": "Active"},
        {"id": 2, "username": "jdoe", "role": "Customer", "status": "Active"},
        {"id": 3, "username": "asmith", "role": "Manager", "status": "Active"}
    ]
    if db is not None:
        try:
            custom_users = list(db.users.find({}, {"_id": 0}))
            if custom_users:
                users = custom_users
        except Exception:
            pass
    return jsonify({"success": True, "users": users}), 200

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get("username", "")
    password = data.get("password", "")
    
    if username == "admin" and password == os.environ.get("ADMIN_PASSWORD", "admin123"):
        return jsonify({
            "success": True,
            "token": f"mock-jwt-token-for-{username}",
            "role": "Administrator",
            "message": "Authentication successful"
        }), 200
    elif username and password:
        return jsonify({
            "success": True,
            "token": f"mock-jwt-token-for-{username}",
            "role": "User",
            "message": "Authentication successful"
        }), 200
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT)
