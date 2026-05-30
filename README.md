# users-ms

Node.js microservice for user auth, MongoDB, Redis cache, and blog posts (2023).

`master` is the final version. Earlier snapshots are available as branches.

## Version history

| Branch | Description | Date |
|--------|-------------|------|
| `version/main` | Initial users-ms | 2023-10-26 |
| `version/get-root-url` | GetRootUrl models | 2023-11-13 |
| `version/login-front-end` | Login front-end | 2023-11-16 |
| `version/register-front-end` | Register front-end | 2023-11-16 |
| `version/mongodb-atlas` | MongoDB Atlas | 2023-11-19 |
| `version/user-undefined-fixed` | User undefined fix | 2023-11-21 |
| `version/redis-cache` | Redis cache | 2023-11-22 |
| `master` | Blog posts + JWT | 2023-11-23 |

```bash
git checkout version/main
git checkout master
```

## Getting started

```bash
npm install
cp src/app/config/env.sample src/app/config/env
npm run dev
```
