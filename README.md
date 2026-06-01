# js3-auth-blog-platform

[![Live demo](https://img.shields.io/badge/demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://javascript-course-3-auth-blog.netlify.app)

**JavaScript 3 major assignment (FE22, autumn 2023)** — full-stack auth & blog app.  
Originally built as many small repos (`users-ms-*`, `My-Next.js-Project`); consolidated here.

This was my **first larger project** where I learned to set up the whole system myself: Next.js UI, API, **MongoDB Atlas**, **Redis** caching, and JWT. Only a few classmates finished a complete version without constant teacher help (~3, including me).

## Live demo

**https://javascript-course-3-auth-blog.netlify.app**

| Page | URL |
|------|-----|
| About (course background + live link) | [/about](https://javascript-course-3-auth-blog.netlify.app/about) |
| Health check | [/api/health](https://javascript-course-3-auth-blog.netlify.app/api/health) |

## Screenshots

| Home | Register | Sign in |
|------|----------|---------|
| ![Home](./screenshots/home.png) | ![Register](./screenshots/register.png) | ![Sign in](./screenshots/signin.png) |

## Course context

| | |
|--|--|
| **Course** | JavaScript 3 (FE22) |
| **Type** | **Major assignment** (not `slutprojekt`, not JS1/JS2 mini project) |
| **Period** | Oct–Nov 2023 |
| **Original Atlas cluster** | `cluster2.6uupj5n.mongodb.net` (Cluster2) |
| **Original DB / collection** | `JS3-app` / `Users` |
| **Not the same as** | `receptBloggCluster` — that belongs to the separate recipe-book project |
| **Also used** | Postman (API + IP access testing), Redis (user + JWT cache) |

## Features

- Dark / light theme
- Registration, JWT sign-in, protected blog posts
- bcrypt passwords (legacy MD5 still accepted)
- Netlify deployment with Next.js runtime

## Local development (optional)

You do **not** need your computer running for the public Netlify site. Local dev is only if you want to change code:

```bash
cp .env.example .env.local
# MONGODB_URI → your Atlas connection string
# JWT_SECRET, MONGODB_DB_NAME=JS3-app, MONGODB_COLLECTION=Users
npm install
npm run dev
```

The app runs on `localhost:3000`; MongoDB stays in Atlas (cloud). In 2023, **Postman** was used to hit the API (e.g. on port 3013) and to confirm Atlas **IP Access List** allowed the current machine.

## Netlify environment variables

| Variable | Required |
|----------|----------|
| `MONGODB_URI` | Yes (Atlas connection string) |
| `JWT_SECRET` | Yes |
| `MONGODB_DB_NAME` | `JS3-app` |
| `MONGODB_COLLECTION` | `Users` |
| `NEXT_PUBLIC_SITE_URL` | `https://javascript-course-3-auth-blog.netlify.app` |

If registration fails, open `/api/health` — it reports whether MongoDB is reachable.

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | DB / config status |
| `POST` | `/api/v1/user` | Register |
| `POST` | `/api/login` | Sign in |
| `POST` | `/api/v1/user/blog` | Blog post (Bearer JWT) |

## Legacy branches

Version snapshots from 2023 coursework: `version/main` … `version/redis-cache` on `master` history.
