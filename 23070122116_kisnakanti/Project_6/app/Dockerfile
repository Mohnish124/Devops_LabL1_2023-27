FROM node:20-alpine
WORKDIR /app
COPY server.js .
COPY public ./public
ENV NODE_ENV=production PORT=3000 CPU_WORK_MS=20
EXPOSE 3000
USER node
CMD ["node", "server.js"]
