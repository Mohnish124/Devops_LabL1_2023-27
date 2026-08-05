from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    print("Conflict trigger: Main branch version.")
    print("Main branch update: Dashboard initialized.")
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
