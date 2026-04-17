# Shree Yoga+ Backend

Express + PostgreSQL backend for the Shree Yoga+ appointment booking app.

## Features

- REST API for classes, bookings, and profile data
- PostgreSQL-ready schema and seed files
- Firebase Admin token verification
- Firebase Cloud Messaging notification hooks
- Local mock-data fallback when `DATABASE_URL` is not configured

## Structure

```text
backend/
|-- db/
|   |-- schema.sql
|   `-- seed.sql
|-- src/
|   |-- config/
|   |-- controllers/
|   |-- data/
|   |-- middleware/
|   |-- routes/
|   |-- services/
|   |-- types/
|   `-- utils/
|-- .env.example
|-- package.json
`-- tsconfig.json
```

## Environment

Copy `.env.example` to `.env` and fill in the values you want to use.

If you do not set `DATABASE_URL`, the API will still run with in-memory mock data for local development.

If you do not set Firebase Admin credentials, authenticated routes can still be tested locally with:

```http
x-dev-user-id: demo-user
```

## Scripts

```bash
npm install
npm run dev
```

## Routes

- `GET /api/v1/health`
- `GET /api/v1/classes`
- `GET /api/v1/classes/:classId`
- `GET /api/v1/bookings/me`
- `POST /api/v1/bookings`
- `DELETE /api/v1/bookings/:bookingId`
- `GET /api/v1/profile/me`
- `PATCH /api/v1/profile/me/notifications`
- `POST /api/v1/profile/me/device-token`
