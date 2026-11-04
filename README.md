# Small Digital

This project is split into two independent apps:

- Frontend: `frontend/` (React + Vite)
- Backend: `backend/` (Express API server)

## Run locally

From the project root:

```bash
npm install
npm run dev
```

This starts:

- Frontend on `http://localhost:5173`
- Backend on `http://localhost:3000`

The frontend uses Vite's proxy so browser requests to `/api/*` are forwarded to the backend.

## Frontend commands

```bash
npm --prefix frontend run dev
npm --prefix frontend run build
npm --prefix frontend run preview
```

## Backend commands

```bash
npm --prefix backend run dev
npm --prefix backend run start
```

## Environment variables

Create a `.env` in the backend folder, not in the frontend app, and set the server-only variables required for MongoDB, email, and Razorpay:

- `MONGODB_URI`
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `CONTACT_EMAIL`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_JWT_SECRET`

The backend exposes the contact, newsletter, payment, and admin APIs. The frontend only talks to the backend through `/api/*` routes.
