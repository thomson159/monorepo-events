# Monorepo Project

This monorepo contains both the **frontend** and **backend** of a web application.

- **Frontend:** React 19, React Router 7, Vite, TailwindCSS
- **Backend:** NestJS 11, TypeScript, Swagger

`node >= v22`

I use:

`node: v22.21.1`
`npm: 11.7.0`

## Project Structure

```
/monorepo-root
│
├─ frontend/       # Frontend application
├─ backend/        # Backend application
└─ README.md
```

---

## Frontend

The frontend is built with **React** and **React Router**, bundled using **Vite**, and styled with **TailwindCSS**.

### Installation

```bash
cd frontend
npm install
```

### Scripts

| Script              | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `npm run dev`       | Runs the frontend in development mode                          |
| `npm run build`     | Builds the production-ready application                        |
| `npm run start`     | Serves the built application (`./build/server/index.js`)       |
| `npm run typecheck` | Generates React Router types and runs TypeScript type checking |

### Dependencies

- `react`, `react-dom` – React libraries
- `react-router` – Routing
- `@react-router/serve` and `@react-router/node` – SSR support
- `tailwindcss` – Styling framework

---

## Backend

The backend is built with **NestJS** and TypeScript, with **Swagger** support.

### Installation

```bash
cd backend
npm install
```

### Scripts

| Script               | Description                      |
| -------------------- | -------------------------------- |
| `npm run start`      | Runs the backend application     |
| `npm run start:dev`  | Development mode with hot-reload |
| `npm run start:prod` | Production mode (`dist/main.js`) |
| `npm run build`      | Builds the backend application   |
| `npm run lint`       | Runs ESLint for code linting     |
| `npm run format`     | Formats code using Prettier      |
| `npm run test`       | Runs unit tests                  |
| `npm run test:watch` | Runs tests in watch mode         |
| `npm run test:cov`   | Runs tests with coverage report  |
| `npm run test:e2e`   | Runs end-to-end tests            |

### Dependencies

- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express` – NestJS framework
- `class-validator`, `class-transformer` – DTO validation
- `swagger-ui-express`, `@nestjs/swagger` – API documentation

---

## Running the Full Project

From the root of the monorepo:

### Frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at `http://localhost:5173` (default Vite port).

### Backend

```bash
cd backend
npm run start:dev
```

Backend will be available at `http://localhost:3000`.

> You can run both services simultaneously in separate terminals.

---

## Technologies

- **Frontend:** React, React Router, Vite, TailwindCSS
- **Backend:** NestJS, Swagger, TypeScript
- **Testing:** Jest, Supertest
- **Lint/Format:** ESLint, Prettier

---

## Tips

- React Router types are generated with `npm run typecheck`
- Swagger for the backend is accessible after running NestJS (e.g., `http://localhost:3000/api`)
- For new developers, it's recommended to start the backend first, then the frontend.
