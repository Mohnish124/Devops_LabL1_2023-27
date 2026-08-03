# Hello World

This repository contains a simple Python application.

## Files

- `app.py` - the main application entry point
- `Dockerfile` - container configuration for building and running the app

## Running the app

Run the following command:

```bash
python app.py
```

## Docker

Build the Docker image:

```bash
docker build -t hello-world .
```

Run the container:

```bash
docker run -p 8000:8000 hello-world
```
