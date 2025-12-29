FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy backend source code
COPY server.js ./

# Expose port
EXPOSE 3000

# Start backend using env variables
CMD ["node", "server.js"]
