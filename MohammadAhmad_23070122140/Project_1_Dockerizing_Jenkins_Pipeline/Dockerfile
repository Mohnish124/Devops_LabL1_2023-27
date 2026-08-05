# Use Python 3.11 slim image for minimal vulnerability footprint
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Configure environment flags
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=5000

# Copy dependency definition and install
COPY flask-app/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask application source code
COPY flask-app/ /app/

# Expose port
EXPOSE 5000

# Health check specification for container monitoring
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/health')" || exit 1

# Launch application
CMD ["python", "app.py"]
