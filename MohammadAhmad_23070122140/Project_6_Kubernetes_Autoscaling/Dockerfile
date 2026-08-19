# Multi-stage / optimized lightweight Node.js container
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package descriptors first to leverage Docker layer caching
COPY app/package.json ./

# Install production dependencies
RUN npm install --only=production --no-audit --no-fund

# Copy application source code
COPY app/ ./

# Use non-root node user for security compliance
USER node

# Expose microservice listening port
EXPOSE 3000

# Health check instruction
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start Node.js application
CMD ["node", "server.js"]
