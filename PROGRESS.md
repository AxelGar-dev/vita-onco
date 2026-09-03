# Progress Log — vita-onco

## Stack

- NestJS + TypeORM + PostgreSQL (Docker Compose)
- Auth: Passport.js (local + JWT strategies)
- Validation: class-validator (DTOs) + Joi (env vars)
- Convention: Conventional Commits, all code/docs in English

## Working method

- Small incremental steps (Axel is new to NestJS, has general backend experience)
- Claude makes default design decisions and explains reasoning
- One commit per logical change, Conventional Commits format
- Fake/anonymized patient data only — never real cases from Axel's wife's job

## Completed so far

### Project setup

- Node.js LTS, NestJS project scaffolded
- Feature-based module structure under `src/modules/`
- PostgreSQL via Docker Compose
- Environment variable validation with Joi

### Users module

- `User` entity (email, passwordHash, role enum: admin/reception/doctor/patient), UUID primary key
- Migration for `users` table (run successfully)
- `UsersService`: `create()` (hashes password with bcrypt) and `findByEmail()`

### Auth module

- `AuthService.validateUser()`: checks email/password against DB
- `LocalStrategy`: powers `POST /auth/login`
- `AuthService.login()`: issues JWT (payload: sub, email, role)
- `JwtStrategy`: validates Bearer token on protected routes
- `AuthController`:
    - `POST /auth/login` → returns `{ access_token }`
    - `GET /auth/me` (protected) → returns decoded user from token
- Tested end-to-end with Postman: login, valid token (200), invalid token (401)
- Dev-only seed script (`src/seed.ts`) to create test users via `UsersService` directly (no public register endpoint yet, intentionally)

## Next step

Build `RolesGuard` + `@Roles()` decorator, so endpoints can be restricted by role (e.g. admin-only). This unblocks:

- A protected `POST /users` endpoint (admin-only, for creating reception/doctor/admin accounts)
- A future public `POST /auth/register` (patients only)

## Not started yet

Patients, Doctors + DoctorAvailability, Appointments, Consultations, Medications/Prescriptions, InsuranceProvider/InsurancePlan, Invoice/InvoiceItem, Notifications, Dashboard/reports
