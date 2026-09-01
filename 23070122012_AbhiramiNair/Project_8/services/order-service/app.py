import os
import requests
from flask import Flask, jsonify

app = Flask(__name__)

USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://user-service:8081")
PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL", "http://product-service:8082")
API_KEY = os.getenv("INTERNAL_API_KEY", "dev-only-key")


@app.get("/health")
def health():
    return jsonify({"service": "order-service", "status": "healthy"})


@app.get("/orders")
def orders():
    try:
        users = requests.get(
            f"{USER_SERVICE_URL}/users",
            timeout=2,
            headers={"X-Internal-Api-Key": API_KEY},
        ).json()

        products = requests.get(
            f"{PRODUCT_SERVICE_URL}/products",
            timeout=2,
            headers={"X-Internal-Api-Key": API_KEY},
        ).json()

        return jsonify({
            "orders": [
                {
                    "id": 5001,
                    "user": users[0],
                    "product": products[0],
                    "quantity": 1,
                }
            ]
        })
    except requests.RequestException as exc:
        return jsonify({"error": "Dependency unavailable", "details": str(exc)}), 503


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8083)
