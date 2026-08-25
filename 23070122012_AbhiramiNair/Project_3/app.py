from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from urllib.parse import urlparse

TASKS = [
    {"id": 1, "title": "Learn Git branching", "completed": True},
    {"id": 2, "title": "Demonstrate feature branch", "completed": False},
]


def response(handler, status, data):
    body = json.dumps(data).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


class TaskHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path

        if path == "/":
            response(
                self,
                200,
                {
                    "project": "TE7950 DevOps Lab - Project 3",
                    "name": "Branching Development Model",
                    "status": "running",
                },
            )
        elif path == "/health":
            response(self, 200, {"status": "healthy"})
        elif path == "/tasks":
            response(self, 200, TASKS)
        else:
            response(self, 404, {"error": "Route not found"})

    def do_POST(self):
        path = urlparse(self.path).path

        if path != "/tasks":
            response(self, 404, {"error": "Route not found"})
            return

        length = int(self.headers.get("Content-Length", "0"))
        try:
            payload = json.loads(self.rfile.read(length) or b"{}")
        except json.JSONDecodeError:
            response(self, 400, {"error": "Invalid JSON"})
            return

        title = str(payload.get("title", "")).strip()
        if not title:
            response(self, 400, {"error": "title is required"})
            return

        new_id = max((task["id"] for task in TASKS), default=0) + 1
        task = {"id": new_id, "title": title, "completed": False}
        TASKS.append(task)
        response(self, 201, task)

    def log_message(self, format, *args):
        print("%s - %s" % (self.address_string(), format % args))


if __name__ == "__main__":
    server = HTTPServer(("127.0.0.1", 8000), TaskHandler)
    print("Task API running at http://127.0.0.1:8000")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()
