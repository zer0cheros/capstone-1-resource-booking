# Resource Booking Web App

## Getting Started (Development)

### 1. Clone the repository

```bash
git clone <repo-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Docker (PostgreSQL)

```bash
docker compose up -d
```
This starts the Postgres database container.

### 4. Set up environment variables

Create a `.env` file in the root of the project:

```bash
DATABASE_URL=postgres://devuser:devpass@localhost:5432/devdb
BETTER_AUTH_SECRET=ANYTHING_YOU_WANT
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### 5. Run database migrations

If running for the first time:

```bash
npx drizzle-kit migrate
```

If you make schema changes:

1. Update drizzle.config.ts if new models are added
2. Generate migration:
    ```bash
    npx drizzle-kit generate
    ```

3. Run migration:
    ```bash
    npx drizzle-kit migrate
    ```

### 6. Start the development server

```bash
npm run dev
```

App will be running at:

```bash
http://localhost:3000
```

Available routes:

* / → Index page
* /login → Login page
* GET → /api/resource - Getting all resources
* POST → /api/resource - Create a new resource
* GET → /api/booking - Getting all bookings
* POST → /api/booking - Create a new booking
* PUT → /api/booking - Update a booking
* DELETE → /api/booking - Delete a booking
* GET → /api/resource/[id] - Get resource by id
* PUT → /api/resource/[id] - Update resource by id  
* DELETE → /api/resource/[id] - Delete resource by id
