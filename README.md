# Jira Timesheet Docker Setup

This project combines the Jira Timesheet API (NestJS) and Client (React) applications in a Docker environment to help track time spent on Jira tickets.

## Prerequisites

- Docker
- Docker Compose

## Initial Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd jira-timesheet
   ```

2. Create environment files:
   ```bash
   # For API
   cp jira-timesheet-api/config/dotenv.example jira-timesheet-api/.env
   
   # For Client (optional for development)
   cp jira-timesheet-client/config/dotenv.example jira-timesheet-client/.env
   ```

## Configuration

### Required Environment Variables

#### API Configuration (jira-timesheet-api/.env)
Copy from `jira-timesheet-api/config/dotenv.example` and configure:
- `JIRA_HOST`: Your Jira instance URL (e.g., your-domain.atlassian.net)
- `JIRA_EMAIL`: Your Jira account email
- `JIRA_API_TOKEN`: Your Jira API token (Generate from Atlassian account settings)
- `JIRA_PROJECT_KEY`: The project key to fetch worklogs from
- `PORT`: API server port (default: 3000)

Example API .env file:
```env
# App Configuration
APP_NAME=Poor Jira Timesheet
PORT=3000

# JIRA Configuration
JIRA_HOST=https://your-company.atlassian.net
JIRA_EMAIL=your.name@company.com
JIRA_API_TOKEN=atatt-xxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JIRA_PROJECT_KEY=PROJ
```

#### Client Configuration (jira-timesheet-client/.env)
Copy from `jira-timesheet-client/config/dotenv.example` and configure if needed:
- `VITE_DEV_SERVER_PORT`: Development server port (default: 4231)
- `NGINX_PORT`: Production nginx server port (default: 4234)
- `BACKEND_URL`: API service URL (default: http://backend:3000)

Example Client .env file:
```env
# Development server configuration
VITE_DEV_SERVER_PORT=4231

# Production configuration
NGINX_PORT=4234
BACKEND_URL=http://backend:3000

# Development API configuration
VITE_API_DOMAIN=localhost
VITE_API_PORT=3000
```

### Optional Environment Variables

#### API Configuration (jira-timesheet-api/.env)
- `NODE_ENV`: Environment mode (default: production)

#### Frontend Configuration (docker-compose.yml)
- `NGINX_PORT`: Frontend server port (default: 4234)
- `VITE_API_URL`: API endpoint URL (automatically configured by nginx)

## Running the Application

1. To stop and clean up any existing containers:
   ```bash
   docker-compose -p poor-mans-jira down -v --rmi all --remove-orphans
   ```

2. To build and start the containers:
   ```bash
   docker-compose -p poor-mans-jira up --build -d
   ```

3. Access the application:
   - Frontend: http://localhost:4234

## Architecture

- Frontend (React + Vite):
  - Runs on nginx server
  - Communicates with API through nginx proxy
  - Port: 4234 (customizable)

- Backend (NestJS):
  - Runs inside Docker network
  - Not exposed to host machine
  - Communicates with Jira API

## Customization Options

### Frontend Customization
1. Nginx Configuration (jira-timesheet-client/nginx.conf):
   - Proxy rules
   - Server settings
   - Cache settings

2. Build Configuration (jira-timesheet-client/vite.config.ts):
   - Development server settings
   - Build optimizations

### API Customization
1. API Settings (jira-timesheet-api/src/config):
   - Rate limiting
   - Cache duration
   - Error handling

2. Docker Configuration:
   - Container resources
   - Network settings
   - Volume mounts

## Development Mode

For development purposes, you can run the applications separately:

1. API (NestJS):
   ```bash
   cd jira-timesheet-api
   npm install
   npm run start:dev
   ```

2. Client (React):
   ```bash
   cd jira-timesheet-client
   npm install
   npm run dev
   ```

## Troubleshooting

1. If the API is not responding:
   - Check Jira credentials in .env file
   - Verify Docker network connectivity
   - Check Docker logs: `docker-compose -p poor-mans-jira logs`

2. If the frontend can't connect to API:
   - Verify nginx configuration
   - Check Docker network status
   - Inspect proxy settings 