# BLMS Frontend

A modern, responsive frontend for the BLMS (Brainiacs Learning Management System) platform. Built with Vue.js and Vuetify, this application provides an intuitive interface for students and educators.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Docker Setup](#docker-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [Yarn](https://yarnpkg.com/) (preferred package manager)
- [Vue CLI](https://cli.vuejs.org/) (for development utilities)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/izabayo7/blms-frontend.git
   cd blms-frontend
   ```

2. Install dependencies using Yarn:
   ```bash
   yarn install
   ```

### Environment Setup

1. You can leave `.env` as it is (pointing to the deployed server) or 

2. Update the `.env` file with your configuration values:
   ```
   VUE_APP_API_URL=http://localhost:7075/api
   ```

## Running the Application

### Development Mode

To start the application in development mode with hot-module replacement:

```bash
yarn dev
```

The development server will be available at `http://localhost:8080` by default.

### Building for Production

To build the application for production:

```bash
yarn build
```

This will create a `dist` directory with optimized and minified assets ready for deployment.

## Project Structure

```
blms-frontend/
├── public/           # Static files
├── src/              # Application source code
│   ├── assets/       # Asset files (images, fonts, etc.)
│   ├── components/   # Vue components
│   ├── plugins/      # Vue plugins
│   ├── router/       # Vue Router configuration
│   ├── store/        # Vuex store
│   ├── views/        # Page components
│   ├── App.vue       # Root component
│   └── main.js       # Application entry point
├── .env.example      # Example environment variables
├── .gitignore        # Git ignore file
├── babel.config.js   # Babel configuration
├── package.json      # Project dependencies
├── vue.config.js     # Vue CLI configuration
└── README.md         # Project documentation
```

## Docker Setup

To run the application using Docker:

1. Make sure you have Docker and Docker Compose installed.

2. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

3. To stop the containers:
   ```bash
   docker-compose down
   ```

## Troubleshooting

### Common Issues

1. **Node.js Version Issues**:
   - This project uses legacy OpenSSL provider for compatibility. If you encounter crypto-related errors, ensure you're using the commands with the `NODE_OPTIONS` flag as defined in the package.json scripts.

2. **Dependencies Installation Issues**:
   - If you encounter problems with npm, try using Yarn instead:
     ```bash
     yarn install --frozen-lockfile
     ```

3. **API Connection Issues**:
   - Ensure the backend server is running
   - Check if the API URL in your `.env` file is correct

4. **Build Memory Issues**:
   - If you encounter memory issues during build, use the build command which allocates more memory:
     ```bash
     yarn build
     ```

### Browser Compatibility

The application is optimized for modern browsers. For the best experience, use the latest versions of:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## License

This project is licensed under the ISC License.
