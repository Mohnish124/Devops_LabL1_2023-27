# 1. Use a lightweight, secure version of Linux with Node pre-installed
FROM node:18-alpine

# 2. Create a specific working directory inside the container
WORKDIR /usr/src/app

# 3. Copy only the package files first (This optimizes Docker caching)
COPY package*.json ./

# 4. Install the production dependencies (cors, express, jsonwebtoken)
RUN npm install --only=production

# 5. Copy the actual application logic (index.js) into the container
COPY . .

# 6. Expose the port the app runs on
EXPOSE 5001

# 7. The command to start the microservice when the container boots
CMD ["node", "index.js"]