# Vercel deployment

This repository is configured as a monorepo with two Vercel projects:

- `client/` for the Create React App frontend
- `server/` for the Express API

This matches Vercel's monorepo guidance: import the same Git repository twice and set a different Root Directory for each project. Vercel also supports npm workspaces at the repository root, which are declared in [package.json](/package.json).

## Project 1: frontend

- Vercel project name: `dino-chrome-web`
- Root Directory: `client`
- Framework Preset: `Create React App`
- Node.js Version: `24.x`
- Build Command: keep Vercel default
- Output Directory: keep Vercel default

Environment variables:

- `REACT_APP_API_URL=https://api.your-domain.com`

## Project 2: backend

- Vercel project name: `dino-chrome-api`
- Root Directory: `server`
- Framework Preset: `Other`
- Node.js Version: `24.x`
- Build Command: keep Vercel default

Environment variables:

- `FRONTEND_URL=https://your-domain.com`
- `SUPABASE_URL=https://your-project.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY=...`
- `JWT_SECRET=...`

## Domains

- Attach your main domain to the frontend project, for example `your-domain.com`
- Attach an API subdomain to the backend project, for example `api.your-domain.com`

## Supabase

Before deploying the backend, run the SQL in [server/supabase-schema.sql](/server/supabase-schema.sql) in the Supabase SQL Editor.

## Notes

- The backend uses Express in [server/src/server.js](/server/src/server.js), which Vercel supports with zero configuration when the app is exported or uses a port listener.
- The frontend remains a static CRA deployment.
- `SUPABASE_SERVICE_ROLE_KEY` must only be configured on the backend Vercel project, never on the frontend project.
