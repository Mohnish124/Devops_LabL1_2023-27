# Use a slim version of the Python 3.9 base image 
FROM python:3.9-slim
# Set the working directory inside the container 
WORKDIR /app
# Copy the requirements file into the working directory 
COPY requirements.txt .
# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
# Copy the application code into the working directory 
COPY . .
# Expose the port the application listens on
EXPOSE 5000
# Define the command to run the application
CMD ["python", "app.py"]