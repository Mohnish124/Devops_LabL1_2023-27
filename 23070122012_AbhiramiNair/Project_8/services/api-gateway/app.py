import os
import requests
from flask import Flask, jsonify

app = Flask(__name__)

USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://user-service:8081")
PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL", "http://product-service:8082")
ORDER_SERVICE_URL = os.getenv("ORDER_SERVICE_URL", "http://order-service:8083")
API_KEY = os.getenv("INTERNAL_API_KEY", "dev-only-key")


def proxy(url):
    try:
        response = requests.get(
            url,
            timeout=3,
            headers={"X-Internal-Api-Key": API_KEY},
        )
        return jsonify(response.json()), response.status_code
    except requests.RequestException as exc:
        return jsonify({"error": "Service unavailable", "details": str(exc)}), 503


@app.get("/")
def home():
    return jsonify({
        "application": "Retail Microservices Platform",
        "services": ["user-service", "product-service", "order-service"]
    })


@app.get("/health")
def health():
    return jsonify({"service": "api-gateway", "status": "healthy"})


@app.get("/users")
def users():
    return proxy(f"{USER_SERVICE_URL}/users")


@app.get("/products")
def products():
    return proxy(f"{PRODUCT_SERVICE_URL}/products")


@app.get("/orders")
def orders():
    return proxy(f"{ORDER_SERVICE_URL}/orders")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
