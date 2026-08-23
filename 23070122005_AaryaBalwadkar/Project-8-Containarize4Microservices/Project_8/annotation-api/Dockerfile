FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5002
# Notice we are calling server.js here!
CMD ["node", "server.js"]