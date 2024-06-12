# Use the official Node.js image as the base image for the backend
FROM node:14 as backend

# Set the working directory for the backend
WORKDIR /app/backend

# Copy the backend package.json and package-lock.json files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend source code
COPY backend/ .

# Build the backend application
RUN npm run build

# Use the official Node.js image as the base image for the frontend
FROM node:14 as frontend

# Set the working directory for the frontend
WORKDIR /app/frontend

# Copy the frontend package.json and package-lock.json files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the frontend source code
COPY frontend/ .

# Build the frontend application
RUN npm run build

# Use the official Node.js image as the final base image
FROM node:14

# Set the working directory for the final image
WORKDIR /app

# Copy the backend build from the backend stage
COPY --from=backend /app/backend /app/backend

# Copy the frontend build from the frontend stage
COPY --from=frontend /app/frontend/build /app/frontend/build

# Install the PM2 process manager globally
RUN npm install -g pm2

# Expose the port the application runs on
EXPOSE 3000

# Start the application using PM2
CMD ["pm2-runtime", "backend/server.js"]
