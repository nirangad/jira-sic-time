# Jira Timesheet Docker Setup

This project combines the Jira Timesheet API (NestJS) and Client (React) applications in a single Docker container.

## Documentation

- [API Documentation](jira-timesheet-api/README.md)
- [Client Documentation](jira-timesheet-client/README.md)

## Prerequisites

- Docker
- Docker Compose

## Configuration

1. Edit the `config/.env.example` file with your specific configuration:
   - JIRA credentials
   - API settings
   - Application settings

   ⚠️ **Important**: You must configure all required environment variables in the `config/.env.example` file before building the Docker images. The application will not function correctly without proper configuration.

## Running the Application

1. Build and start the container:
   ```bash
   docker-compose -p jira-timesheet up --build -d
   ```

2. The application will be available at `http://localhost:4200`

## Environment Variables

The following environment variables can be configured:

- `VITE_API_URL`: API endpoint URL (default: http://localhost:3000)
- `VITE_API_KEY`: API authentication key
- `VITE_APP_NAME`: Application name (default: Jira Timesheet)
- `VITE_APP_ENV`: Application environment (default: development)
- `VITE_JIRA_HOST`: Your JIRA domain (e.g., your-domain.atlassian.net)
- `VITE_JIRA_EMAIL`: Your JIRA email
- `VITE_JIRA_API_TOKEN`: Your JIRA API token
- `VITE_JIRA_PROJECT_KEY`: Your JIRA project key

## Development

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