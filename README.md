# Shree Yoga+

A mobile-first yoga studio appointment platform with a React Native frontend and a Node.js/Express backend.

## Overview

Shree Yoga+ is designed to provide a polished booking experience for studio clients while giving the backend a production-oriented structure for API, auth, and notification integrations.

### Core Capabilities

- User onboarding and authenticated app flow
- Class discovery and session detail views
- Booking creation and cancellation flow
- Profile and notification preferences management
- Backend APIs for classes, bookings, and profile operations

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native (Expo), TypeScript |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL (with local mock-data fallback) |
| Authentication | Firebase Auth / Firebase Admin |
| Notifications | Firebase Cloud Messaging (FCM) |

## Repository Structure

```text
.
|-- backend/
|   |-- db/
|   |-- src/
|   |-- .env.example
|   |-- package.json
|   `-- README.md
|-- frontend/
|   |-- src/
|   |-- App.tsx
|   |-- app.json
|   `-- package.json
|-- package.json
`-- README.md
```

## Prerequisites

- Node.js (LTS recommended)
- npm
- PostgreSQL (optional for full backend persistence)

## Getting Started

### 1) Install Dependencies

```bash
npm ci --prefix frontend
npm ci --prefix backend
```

### 2) Configure Environment

- Copy `backend/.env.example` to `backend/.env`
- Set environment values as needed
- If `DATABASE_URL` is not set, the backend runs with in-memory mock data

### 3) Run the Application

From the repository root:

```bash
npm run start:backend
npm run start:frontend
```

## Available Scripts (Root)

| Command | Description |
|---|---|
| `npm run start:frontend` | Start Expo frontend |
| `npm run start:backend` | Start backend in watch/dev mode |
| `npm run android` | Run frontend on Android |
| `npm run ios` | Run frontend on iOS |
| `npm run web` | Run frontend on web |
| `npm run typecheck:frontend` | Run frontend TypeScript checks |
| `npm run typecheck:backend` | Run backend TypeScript checks |

## Backend API Snapshot

Base path: `/api/v1`

- `GET /health`
- `GET /classes`
- `GET /classes/:classId`
- `GET /bookings/me`
- `POST /bookings`
- `DELETE /bookings/:bookingId`
- `GET /profile/me`
- `PATCH /profile/me/notifications`
- `POST /profile/me/device-token`

For full backend setup and implementation details, see:

- [`/backend/README.md`](./backend/README.md)
