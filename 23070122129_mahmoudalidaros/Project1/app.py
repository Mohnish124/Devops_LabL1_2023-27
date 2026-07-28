from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    print("User Authentication Feature")
    return "Hello from Feature Branch!"
if __name__ == "__main__":
    app.run(debug=True)