# Build stage for the API
FROM node:20-alpine AS api-builder
WORKDIR /app/api
COPY jira-timesheet-api/package*.json ./
RUN npm install
COPY jira-timesheet-api .
RUN npm run build

# Build stage for the client
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY jira-timesheet-client/package*.json ./
RUN npm install
COPY jira-timesheet-client .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy built API
COPY --from=api-builder /app/api/dist ./api/dist
COPY --from=api-builder /app/api/package*.json ./api/
COPY --from=api-builder /app/api/node_modules ./api/node_modules

# Copy built client
COPY --from=client-builder /app/client/dist ./client/dist

# Create a script to start both services
RUN echo '#!/bin/sh\n\
cd /app/api\n\
node dist/main\n' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 3000

CMD ["/app/start.sh"] 