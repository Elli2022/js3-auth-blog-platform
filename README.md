# js3-auth-blog-platform

[![Live demo](https://img.shields.io/badge/Live%20demo-Netlify-2563eb?style=for-the-badge&logo=netlify&logoColor=white)](https://javascript-course-3-auth-blog.netlify.app)
![FE22](https://img.shields.io/badge/Program-FE22-2563eb?style=for-the-badge)
![JavaScript 3](https://img.shields.io/badge/Course-JavaScript%203-2563eb?style=for-the-badge)
![Major assignment](https://img.shields.io/badge/Assignment-St%C3%B6rre%20uppgift-2563eb?style=for-the-badge)

[![Next.js](https://img.shields.io/badge/Next.js-14-2563eb?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-2563eb?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-2563eb?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![JWT](https://img.shields.io/badge/Auth-JWT-2563eb?style=for-the-badge)](https://jwt.io/)
[![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-2563eb?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Blog](https://img.shields.io/badge/Feature-Protected%20blog-2563eb?style=for-the-badge)](https://javascript-course-3-auth-blog.netlify.app/dashboard)
[![CI](https://img.shields.io/badge/Deploy-GitHub%20Actions-2563eb?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/Elli2022/js3-auth-blog-platform/actions)

<p align="center">
  <strong>JavaScript 3 major assignment (FE22, autumn 2023)</strong> — full-stack auth &amp; blog app.<br>
  Originally many small repos (<code>users-ms-*</code>, <code>My-Next.js-Project</code>); consolidated here.
</p>

<p align="center">
  <strong><a href="https://javascript-course-3-auth-blog.netlify.app">https://javascript-course-3-auth-blog.netlify.app</a></strong>
</p>

This was my **first larger project** where I learned to set up the whole system myself: Next.js UI, API, **MongoDB Atlas**, **Redis** caching (2023 microservice), and JWT. Only a few classmates finished a complete version without constant teacher help (~3, including me).

## In-app highlights

Blue status pills on the home and about pages mirror the stack:

`FE22` · `JavaScript 3` · `Större uppgift` · `Next.js 14` · `MongoDB Atlas` · `JWT` · `Netlify`

## Live demo

| Page | URL |
|------|-----|
| Home | [/](https://javascript-course-3-auth-blog.netlify.app/) |
| Dashboard (blog) | [/dashboard](https://javascript-course-3-auth-blog.netlify.app/dashboard) |
| About (course + Atlas history) | [/about](https://javascript-course-3-auth-blog.netlify.app/about) |
| Health check | [/api/health](https://javascript-course-3-auth-blog.netlify.app/api/health) |

## Screenshots

| Home | Register | Sign in |
|------|----------|---------|
| ![Home](./screenshots/home.png) | ![Register](./screenshots/register.png) | ![Sign in](./screenshots/signin.png) |

| Dashboard | About |
|-----------|-------|
| ![Dashboard](./screenshots/dashboard.png) | ![About](./screenshots/about.png) |

## Course context

| | |
|--|--|
| **Course** | JavaScript 3 (FE22) |
| **Type** | **Major assignment** (not `slutprojekt`, not JS1/JS2 mini project) |
| **Period** | Oct–Nov 2023 |
| **Original Atlas cluster (2023)** | `cluster2.6uupj5n.mongodb.net` (removed) |
| **Current Atlas project** | `js3-auth-blog` (renamed from Project 0, June 2026) |
| **Current cluster** | `JS3-app` → `js3-app.72twkv6.mongodb.net` |
| **DB / collections** | `JS3-app` / `Users`, `blogPosts` |
| **App DB user** | `js3-auth-app` (credentials in Netlify `MONGODB_URI`) |
| **Not the same as** | `receptBloggCluster` — separate recipe-book project |
| **Also used (2023)** | Postman (API + IP access testing), Redis (user + JWT cache) |

### Atlas databases in the cluster

Only **`JS3-app`** is for this app. **`admin`** and **`local`** are created automatically by MongoDB — ignore them.

## Features

- Dark / light theme
- Registration, JWT sign-in, protected blog posts
- Dashboard lists your posts; author is your **username** (no manual author field)
- bcrypt passwords (legacy MD5 still accepted for old accounts)
- Netlify deployment with Next.js runtime
- **Auto-deploy** on push to `master` via GitHub Actions

## Automatic deployment

Every push to **`master`** on GitHub runs [`.github/workflows/netlify-deploy.yml`](.github/workflows/netlify-deploy.yml) and deploys to production with `netlify deploy --prod --build` (Next.js plugin included).

Required repository secrets (already configured if CI is green):

| Secret | Value |
|--------|--------|
| `NETLIFY_AUTH_TOKEN` | [Personal access token](https://app.netlify.com/user/applications#personal-access-tokens) |
| `NETLIFY_SITE_ID` | `b61b8c26-58ed-45b1-952e-216d9a0c1786` |

Check runs: [GitHub Actions](https://github.com/Elli2022/js3-auth-blog-platform/actions).

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

Store the Atlas password in a password manager: copy `MONGODB_URI` from [Netlify environment variables](https://app.netlify.com/sites/javascript-course-3-auth-blog/configuration/env) (user `js3-auth-app`). Never commit credentials to git.

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | DB / config status |
| `POST` | `/api/v1/user` | Register |
| `POST` | `/api/login` | Sign in → `{ token, userId, username }` |
| `GET` | `/api/v1/user/blog` | List your posts (Bearer JWT) |
| `POST` | `/api/v1/user/blog` | Create post (Bearer JWT; author = logged-in username) |

## Legacy branches

Version snapshots from 2023 coursework: `version/main` … `version/redis-cache` on `master` history.

## Repository

https://github.com/Elli2022/js3-auth-blog-platform
