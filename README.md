# node-webscraper-github

## Description

This project started as a small project to learn mainly web scraping. Out of eagerness to explore and learn more, this project evolved into a monorepo containing an express backend that serves a single-page React application (powered by Vite), all written in TypeScript. While creating the monorepo, a primary focus was placed on improving the Developer Experience (DX). Resulting in needing to use only one localhost port for both the backend and the frontend in development. Plus, there's hot module reloading for the frontend, and the backend automatically restarts when changes are made, eliminating the need for manual reloading.
In production, the entire application is managed by the Express backend, which includes serving the frontend. This means that you can access both the frontend and backend API using the same URL.

Currently the frontend consists of two dummy pages, while the backend api scrapes the user name and project title of Github's trending repositories.

## Features

- **Monorepo**: The project is organized in a monorepo consisting of an express backend and a React frontend build with Vite and including React Router v6.

- **Express Backend**: Built with Express.js providing the backend API and serving the frontend in production.

- **React+Vite Frontend**: The frontend utilizes React and Vite, ensuring a fast and efficient development experience.

- **TypeScript**: The entire project is written in TypeScript, offering type safety and improved code quality.

- **Hot Reloading**: Both the frontend and backend support hot reloading in development.

- **Single Localhost**: In development one local server is used for both the frontend and the backend api.

- **React Router v6**: React Router v6: Utilizes React Router v6 for handling client-side routing.

- **Web Scraping**: Web scraping using Cheerio.

## Setup development

1. Clone this repository:

   ```sh
   git clone https://github.com/totti-rdz/node-webscraper-github.git
   ```

2. Install:

   ```sh
   npm install
   ```

3. Run in development mode:

   ```sh
   npm run dev
   ```

   The backend is listening on port 3000 if not specified otherwise via environmental variable. The frontend is running on port 5173.
   In development mode trying to access the backend directly will result in being redirected to localhost:5173 unless an API request is directly made to the backend e.g. localhost:3000/api/repos. However, the same request can be made on localhost:5173 -> localhost:5173/api/repos. Hence it is recommended to only use localhost:5173 during development.

## Build production

1. Build project

   ```sh
   npm run build
   ```

2. Serve

   ```sh
   npm start
   ```

The build output is located in `/server/dist/`.
After running `npm start` the API can be accessed via localhost:3000/api/ROUTE. Additionally, the frontend is accessible at localhost:3000/PAGE.