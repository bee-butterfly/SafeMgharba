# Safemgharba Backend

Node.js + Express backend with MongoDB (Mongoose).
Requires a running MongoDB (local or Atlas) and env vars in `.env`.

## Environment

Copy `.env.example` to `.env` and adjust if needed:

```
MONGODB_URI=mongodb://localhost:27017/safemgharba
PORT=3000
JWT_SECRET=change_me_to_a_long_random_secret
FRONTEND_ORIGIN=http://localhost:3000
```

## Run

1. Install dependencies
   - `npm install`
2. Start dev server (with reload)
   - `npm run dev`
3. Or start normally
   - `npm start`

Server listens on `http://localhost:3000` by default.

## Endpoints

- POST /users/new       -> create user (matches provided image)
- GET  /users           -> list users
- GET  /users/:id       -> get user
- PUT  /users/:id       -> update user
- DELETE /users/delete/:id -> delete user (matches image)

- POST /reports        -> create report
- GET  /reports        -> list reports
- GET  /reports/:id    -> get report
- DELETE /reports/:id  -> delete report

Notes:

- All data is persisted in MongoDB using Mongoose models `User` and `Report` under `models/`.
- CORS is restricted by `FRONTEND_ORIGIN`. For multiple origins, separate by commas.
