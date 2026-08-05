# Stage 1: Build production React assets using Node alpine
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package descriptors and install dependencies
COPY react-app/package.json react-app/package-lock.json* ./
RUN npm ci || npm install

# Copy application source code and build production bundle
COPY react-app/ ./
RUN npm run build

# Stage 2: Serve optimized static bundle using Nginx alpine
FROM nginx:alpine AS runner

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static distribution files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
