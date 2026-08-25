from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return '<h1>Hello, World!</h1><p>DevOps Lab - Aayush Joshi (23070122008)</p>'

@app.route('/health')
def health():
    return {'status': 'ok', 'app': 'Hello World Flask'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
