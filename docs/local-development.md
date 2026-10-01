# Local Development

## Prerequisites
- Node v26
- JDK 24
- Python 3.11
- Git
- Docker & Docker Compose

## Starting Docker Services
First, create your local environment file:
```bash
cd docker
cp .env.example .env
# Edit .env with your desired local passwords
```

Then start the PostgreSQL and Redis containers:
```bash
docker compose up -d
docker compose ps
```

## Starting the Backend
The Spring Boot application automatically picks up the Docker credentials from `docker/.env`.
```bash
cd backend
.\mvnw.cmd spring-boot:run
```
Flyway will automatically apply any pending migrations. The health check is available at `http://localhost:8080/api/health`.

## Starting the Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend is available at `http://localhost:5173`.
