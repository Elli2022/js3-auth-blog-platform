# Auth & Blog (users-ms-main)

[![Live demo](https://img.shields.io/badge/demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://elli-auth-blog.netlify.app)

Full-stack app from **autumn 2023** coursework: Next.js UI with theme toggle, JWT auth, MongoDB, and protected blog posts. Consolidated from the chronological `My-Next.js-Project` and `users-ms-*` repositories.

## Live demo

**https://elli-auth-blog.netlify.app**

About page (school background + link): [/about](https://elli-auth-blog.netlify.app/about)

## Screenshots

| Home | Sign in | Dashboard |
|------|---------|-----------|
| ![Home](./screenshots/home.png) | ![Sign in](./screenshots/signin.png) | ![Dashboard](./screenshots/dashboard.png) |

## Features

- Light / dark theme (`next-themes`)
- User registration and JWT sign-in
- Authenticated blog post creation
- MongoDB Atlas + bcrypt passwords (legacy MD5 accounts still work)
- Deployed on Netlify (Next.js API routes)

## School background

| Question | Answer |
|----------|--------|
| Program | **FE22** (frontend developer track), same era as other `FE22-*` repos |
| Period | **Oct–Nov 2023** (version branches dated weekly) |
| Type | Progressive **full-stack / microservice** exercise—not a named *slutprojekt* |
| Original shape | Many small GitHub repos → merged into `users-ms-main` + `My-Next.js-Project` |

Substitute-teacher coverage (~6 weeks) is **not** mentioned in git history; only your recollection—commits show steady weekly snapshots instead.

## Stack

- Next.js 14, TypeScript, Tailwind CSS
- MongoDB, JWT, bcrypt
- Netlify (`@netlify/plugin-nextjs`)

## Local development

```bash
cp .env.example .env.local
# Set MONGODB_URI and JWT_SECRET
npm install
npm run dev
```

Open http://localhost:3000

## Netlify environment variables

| Variable | Required |
|----------|----------|
| `MONGODB_URI` | Yes |
| `JWT_SECRET` | Yes |
| `MONGODB_DB_NAME` | No (default `db_my_app`) |
| `MONGODB_COLLECTION` | No (default `coll_users`) |
| `NEXT_PUBLIC_SITE_URL` | Yes after deploy (your Netlify URL) |

## API

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/user` | Register |
| `GET` | `/api/v1/user?username=` | Lookup users |
| `POST` | `/api/login` | Sign in → `{ token, userId }` |
| `POST` | `/api/v1/user/blog` | Create post (Bearer JWT) |

## Version history (legacy branches)

See branch table in repo history: `version/main` … `version/redis-cache` → `master` (2023 snapshots preserved).
