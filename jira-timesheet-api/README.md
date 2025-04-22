# Jira Timesheet API

A NestJS-based API service for managing and tracking Jira timesheet entries.

## Description

This API service provides endpoints to interact with Jira's timesheet functionality, allowing for efficient time tracking and management of work logs. Built with NestJS, it offers a robust and scalable solution for timesheet management.

## Features

- RESTful API endpoints for timesheet operations
- Integration with Jira's API
- Environment-based configuration
- TypeScript support
- Automated testing setup

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Jira account with appropriate API access

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd jira-timesheet-api

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
JIRA_API_URL=your_jira_api_url
JIRA_API_TOKEN=your_jira_api_token
JIRA_USER_EMAIL=your_jira_email
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## Available Scripts

- `npm run build` - Compiles the TypeScript code
- `npm run format` - Formats the code using Prettier
- `npm run start` - Runs the application
- `npm run start:dev` - Runs the application in watch mode
- `npm run start:debug` - Runs the application in debug mode
- `npm run start:prod` - Runs the application in production mode
- `npm run lint` - Lints the code
- `npm run test` - Runs unit tests
- `npm run test:watch` - Runs unit tests in watch mode
- `npm run test:cov` - Runs unit tests with coverage
- `npm run test:e2e` - Runs end-to-end tests

## Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── main.ts              # Application entry point
├── app.module.ts        # Root module
├── app.controller.ts    # Root controller
├── app.service.ts       # Root service
└── ...
```

## Dependencies

- @nestjs/common
- @nestjs/core
- @nestjs/platform-express
- axios
- dotenv
- reflect-metadata
- rxjs

## Development Dependencies

- @nestjs/cli
- @nestjs/schematics
- @nestjs/testing
- jest
- typescript
- eslint
- prettier

## License

This project is licensed under the UNLICENSED license.
