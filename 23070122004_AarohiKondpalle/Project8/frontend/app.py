from flask import Flask, jsonify
import os
import requests

app = Flask(__name__)

USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://localhost:5001")
PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL", "http://localhost:5002")
ORDER_SERVICE_URL = os.getenv("ORDER_SERVICE_URL", "http://localhost:5003")


@app.route("/")
def home():
    return jsonify({
        "application": "E-Commerce Microservices Application",
        "status": "running",
        "services": {
            "user_service": USER_SERVICE_URL,
            "product_service": PRODUCT_SERVICE_URL,
            "order_service": ORDER_SERVICE_URL
        }
    })


@app.route("/dashboard")
def dashboard():
    result = {}

    try:
        result["users"] = requests.get(
            USER_SERVICE_URL + "/users", timeout=3
        ).json()
    except Exception as e:
        result["users"] = {"error": str(e)}

    try:
        result["products"] = requests.get(
            PRODUCT_SERVICE_URL + "/products", timeout=3
        ).json()
    except Exception as e:
        result["products"] = {"error": str(e)}

    try:
        result["orders"] = requests.get(
            ORDER_SERVICE_URL + "/orders", timeout=3
        ).json()
    except Exception as e:
        result["orders"] = {"error": str(e)}

    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)