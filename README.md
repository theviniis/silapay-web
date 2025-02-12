# Product Management Application

A Vue 3 application for managing products, built with TypeScript, Vite, Zod for validation, and Tanstack Query/Table for data management and display.

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Vite
- Zod (Schema validation)
- Tanstack Query (Data fetching)
- Tanstack Table (Table management)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn
- A running instance of the NestJS backend API

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/theviniis/silapay-web.git
cd silapay-web
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Environment Setup

- Copy the `.env.example` file to create a new `.env` file

```bash
cp .env.example .env
```

### 4. Configure your `.env` file with the following variables:

```bash
API_URL="http://localhost:3333/api" # Your NestJS API URL
```

## Development

To start the development server:

```bash
yarn dev
```

The application will be available at http://localhost:5173

## Building for Production

### 1. Build the application:

```bash
yarn build
```

## Deployment

Static Hosting (e.g., Netlify, Vercel)

### 1. Build your application

```bash
yarn build
```

### 2. The built files will be in the dist directory

### 3. Deploy the dist directory to your hosting provider:

- For Netlify: Connect your repository and set the build command to yarn build and the publish directory to dist
- For Vercel: Connect your repository and it will automatically detect the Vue/Vite configuration

## Features

- Product Management:
  - Create new products
  - List all products with pagination
  - View product details
  - Edit existing products
  - Delete products

## API Integration

This application connects to a NestJS backend API. Ensure the API is running and accessible at the URL specified in your `.env` file.

## Additional Documentation

- Vue 3 Documentation: https://vuejs.org/
- Vite Documentation: https://vitejs.dev/
- TanStack Query Documentation: https://tanstack.com/query/latest
- TanStack Table Documentation: https://tanstack.com/table/v8
- Zod Documentation: https://zod.dev/
