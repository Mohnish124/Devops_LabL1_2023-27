from flask import Flask

app = Flask(__name__) # Create a Flask application.

@app.route('/')
def hello():
    return "Hello World"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) # Start the server.
    