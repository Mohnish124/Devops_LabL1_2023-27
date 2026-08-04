# Use lightweight official Python slim base image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Prevent Python from writing pyc files and buffer stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy requirements file first to leverage Docker cache
COPY hello-flask-app/requirements.txt /app/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source code
COPY hello-flask-app/ /app/

# Expose container port 5000
EXPOSE 5000

# Specify entrypoint command to run Flask application
CMD ["python", "app.py"]
