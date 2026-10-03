# Project Complexity Analyzer — Frontend

Next.js App Router frontend for analyzing software project complexity, managing saved analyses, and comparing projects.

## Features

- Email/password registration and login
- Google and GitHub sign-in
- Email verification and password reset screens
- Manual project analysis form
- AI-assisted project idea generation
- Dashboard and project management
- Complexity analysis results and PDF report download
- Project comparison
- Profile settings

## Requirements

- Node.js and npm
- The NestJS backend running and reachable

## Setup

From this folder:

```bash
npm install
```

Create `.env.local` in `web/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Set the URL to the NestJS backend's origin. Do not add an endpoint path such as `/projects` or `/auth`.

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```bash
npm run lint
npm run build
npm run start
```

`npm run start` serves the production build, so run `npm run build` first.

## Deployment

For Vercel, set `NEXT_PUBLIC_API_URL` to the deployed NestJS backend's base URL, then deploy the frontend. Also configure the backend's `FRONTEND_URL` and OAuth provider callback URLs for the deployed domains.