# Safemgharba Backend

Small Express backend intended for local development. Uses an in-memory store (no DB). Endpoints:

- POST /users/new       -> create user (matches provided image)
- GET  /users           -> list users
- GET  /users/:id       -> get user
- PUT  /users/:id       -> update user
- DELETE /users/delete/:id -> delete user (matches image)

- POST /reports        -> create report
- GET  /reports        -> list reports
- GET  /reports/:id    -> get report
- DELETE /reports/:id  -> delete report

Run

1. cd Back-end
2. npm install
3. npm run dev
