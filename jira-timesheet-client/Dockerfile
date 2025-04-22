# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM python:3.11-alpine

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/dist /app

# Expose the port the app runs on
EXPOSE 4200

# Start Python HTTP server
CMD ["python3", "-m", "http.server", "4200", "--bind", "0.0.0.0"] 