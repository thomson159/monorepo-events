# Monorepo Project

This monorepo contains both the **frontend** and **backend** of a web application.

- **Frontend:** React 19, Next 16, TailwindCSS
- **Backend #1:** NestJS 11, TypeScript, Swagger (backend/rest)
- **Backend #2:** .NET 8, Graft (backend/dotnet-service)

`node >= v22`

I use:

`node: v22.21.1`
`npm: 11.7.0`

## Project Structure

```
/monorepo-root
│
├─ frontend/       # Frontend application
├─ backend/
│   ├─ rest/   # NestJS + TypeScript
│   └─ dotnet-service/ # .NET 8, Graft
└─ README.md
```

# ⚠️ Frontend

Illustrates the key differences between server-side rendering (SSR) and client-side rendering (CSR).

---

## Technologies

- **Frontend:** React, Next, TailwindCSS
- **Backend 1:** NestJS, Swagger, TypeScript
- **Backend 2:** .NET 8, Graft
- **Testing:** Jest, Supertest
- **Lint/Format:** ESLint, Prettier

---

## Tips

- Swagger for the backend is accessible after running NestJS (e.g., `http://localhost:3000/api`)
- For new developers, it's recommended to start the backend first, then the frontend.

## Team members

[@thomson159](https://github.com/thomson159)

# ⚠️ Feel free to explore my other projects as well, which follow a similar approach but are built with different frameworks.

The frontend of this project is built with Vite, and React Router. Not fully polished, and includes many experiments and iterations I tried while developing this project.

https://github.com/thomson159/sales-dashboard

A simple backend for a POS application. Stack: Express + TS, PostgreSQL, JWT, TSOA + Swagger.

https://github.com/thomson159/pos-backend
