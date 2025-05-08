# Jira Timesheet Client

A modern web application for managing Jira timesheets, built with React, TypeScript, and Vite.

## Features

- Modern React application with TypeScript support
- Fast development with Vite's Hot Module Replacement (HMR)
- ESLint configuration for code quality
- Type-safe development environment

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd jira-timesheet-client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:2999`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
jira-timesheet-client/
├── src/            # Source files
├── public/         # Static assets
├── node_modules/   # Dependencies
├── index.html      # Entry HTML file
├── package.json    # Project configuration and dependencies
├── tsconfig.json   # TypeScript configuration
└── vite.config.ts  # Vite configuration
```

## Development

This project uses:
- React 19
- TypeScript
- Vite
- ESLint for code linting

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
