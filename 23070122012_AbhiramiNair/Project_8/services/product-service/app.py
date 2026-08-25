from flask import Flask, jsonify

app = Flask(__name__)

PRODUCTS = [
    {"id": 101, "name": "Running Shoes", "price": 2499},
    {"id": 102, "name": "T-Shirt", "price": 799},
    {"id": 103, "name": "Backpack", "price": 1599},
]


@app.get("/health")
def health():
    return jsonify({"service": "product-service", "status": "healthy"})


@app.get("/products")
def products():
    return jsonify(PRODUCTS)


@app.get("/products/<int:product_id>")
def product(product_id):
    item = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if item is None:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(item)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8082)
