import os
import datetime
from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

PORT = int(os.environ.get("PORT", 5002))
DB_HOST = os.environ.get("DB_HOST", "mongodb-service")
DB_PORT = int(os.environ.get("DB_PORT", 27017))
DB_NAME = os.environ.get("DB_NAME", "ecommerce_db")
DB_USER = os.environ.get("DB_USER", "admin")
DB_PASS = os.environ.get("DB_PASS", "secretpassword")
API_SECRET_KEY = os.environ.get("API_SECRET_KEY", "order-service-api-key-xyz")
APP_ENV = os.environ.get("APP_ENV", "production")

fallback_orders = [
    {
        "order_id": "ORD-1001",
        "customer": "jdoe",
        "item": "Kubernetes in Action Book",
        "quantity": 1,
        "price": 49.99,
        "status": "Delivered",
        "timestamp": "2026-08-28 10:30:00"
    },
    {
        "order_id": "ORD-1002",
        "customer": "asmith",
        "item": "Docker & K8s Pro Bundle",
        "quantity": 2,
        "price": 129.50,
        "status": "Processing",
        "timestamp": "2026-08-29 14:15:00"
    },
    {
        "order_id": "ORD-1003",
        "customer": "admin",
        "item": "Cloud Architecture Guide",
        "quantity": 1,
        "price": 75.00,
        "status": "Shipped",
        "timestamp": "2026-08-30 09:00:00"
    }
]

def get_db():
    try:
        mongo_uri = f"mongodb://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/?authSource=admin"
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=2000)
        client.server_info()
        return client[DB_NAME]
    except Exception:
        return None

@app.route('/health', methods=['GET'])
def health():
    db = get_db()
    db_status = "connected" if db is not None else "disconnected (fallback mode)"
    return jsonify({
        "status": "healthy",
        "service": "order-service",
        "environment": APP_ENV,
        "database": db_status,
        "config": {
            "port": PORT,
            "db_host": DB_HOST
        }
    }), 200

@app.route('/api/orders', methods=['GET'])
def get_orders():
    db = get_db()
    orders = []
    if db is not None:
        try:
            mongo_orders = list(db.orders.find({}, {"_id": 0}))
            if mongo_orders:
                orders = mongo_orders
        except Exception:
            pass

    if not orders:
        orders = fallback_orders

    return jsonify({"success": True, "orders": orders, "count": len(orders)}), 200

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.get_json() or {}
    customer = data.get("customer", "Guest")
    item = data.get("item", "Generic Product")
    try:
        quantity = int(data.get("quantity", 1))
        price = float(data.get("price", 29.99))
    except (ValueError, TypeError):
        quantity = 1
        price = 29.99

    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    order_id = f"ORD-{datetime.datetime.now().strftime('%M%S%f')[:7]}"

    new_order = {
        "order_id": order_id,
        "customer": customer,
        "item": item,
        "quantity": quantity,
        "price": price,
        "status": "Confirmed",
        "timestamp": now_str
    }

    db = get_db()
    saved_to_db = False
    if db is not None:
        try:
            db.orders.insert_one(dict(new_order))
            saved_to_db = True
        except Exception:
            pass

    fallback_orders.insert(0, new_order)

    return jsonify({
        "success": True,
        "message": "Order created successfully",
        "order": new_order,
        "saved_to_database": saved_to_db
    }), 201

@app.route('/api/orders/stats', methods=['GET'])
def get_stats():
    orders = fallback_orders
    db = get_db()
    if db is not None:
        try:
            db_orders = list(db.orders.find({}, {"_id": 0}))
            if db_orders:
                orders = db_orders
        except Exception:
            pass

    total_revenue = sum(o.get("price", 0) * o.get("quantity", 1) for o in orders)
    return jsonify({
        "success": True,
        "total_orders": len(orders),
        "total_revenue": round(total_revenue, 2),
        "service": "order-service"
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT)
