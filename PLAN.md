# Geopulse — Geofencing Attendance SPA Plan

TL;DR — Build a Vite + React SPA using TanStack Query/Router with a switchable DB adapter (SQLite via Prisma for local dev, Supabase for production). Client performs geofence checks (Haversine) and uploads attendance events to the adapter. Use local queueing for offline support and an Edge Function / server API for server-side validation when needed.

## Steps

1. Project setup
   - Ensure Vite + React, TanStack Query and Router are installed and working. Add `@supabase/supabase-js`, `prisma`, `@prisma/client`, and `localforage` as dependencies.

2. Local DB (dev): Prisma + SQLite
   - Keep `prisma/schema.prisma` (SQLite datasource). Run `npx prisma migrate dev --name init` and `npx prisma generate` to create the client.

3. Switchable DB adapter
   - Create `src/lib/db.ts` (adapter) that exposes `getSites()` and `submitAttendance()` and selects between Prisma (sqlite) and Supabase based on `DB_ADAPTER` env var.

4. Supabase integration (prod)
   - Add `src/lib/supabase.ts` to init and export Supabase client. Add `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and optionally `SERVICE_ROLE_KEY` for server usage.

5. Database schema
   - Tables: `sites` and `attendance_events` (fields: user_id, site_id, lat, lng, accuracy_meters, distance_meters, photo_url, device_info, verified, created_at).
   - Keep Prisma models and a matching Supabase SQL schema to enable migration.

6. UI & Routes
   - Routes under `src/routes/`: index, `/sites`, `/checkin/[siteId]`, `/profile`.
   - Components: `CheckInButton`, `SiteList`, `SiteCard`, `PhotoCapture`, `QueueStatus`.

7. Geofence logic (client)
   - Utility: `distanceMeters()` (Haversine). Hook `useGeolocation()` to request permission and return coords + accuracy.
   - Check-in flow: get position (enableHighAccuracy), compute distance, compare vs site.radius and accuracy threshold, require selfie or optional QR.

8. Offline queue & sync
   - Use `localforage` to queue failed submissions. Add `drainQueue()` invoked on network regain or app resume.

9. Server-side validation (optional but recommended)
   - Create an Edge Function or small `api/checkin` that receives coordinates + site_id and validates the distance against the authoritative site location, signing writes with a service key.
   - RLS: In Supabase, allow only authenticated inserts via Edge Function; optionally require `verified` flag set only by server.

10. Deploy & CI

- Frontend: static build → Vercel/Netlify. Env vars set in platform. Supabase remains backend (free tier).

## Verification

1. Unit tests
   - Test `distanceMeters()` with known points and expected meters.
   - Mock geolocation to validate `useGeolocation` and check-in acceptance/rejection logic.

2. Integration tests
   - Local dev flow: SQLite + Prisma — create site, perform check-in, verify attendance row created.
   - Supabase flow: use local Supabase CLI or remote dev project to validate storage and Edge Function behavior.

3. Manual tests (critical)
   - Browser: Desktop check-in using simulated geolocation in devtools.
   - Mobile browser: test on Android and iOS for permission prompts; verify accuracy behavior and offline queueing.
   - Real-device tests: ensure check-in works with real GPS, varying accuracy, and offline/poor-network cases.

## Decisions & assumptions

- Default dev adapter: `sqlite` via Prisma for fast local iteration. Production adapter: `supabase` for Auth + hosted Postgres + Storage.
- Client-side distance check is acceptable for initial trust, but server-side validation via Edge Function is recommended to reduce spoofing.
- Do not expose Supabase SERVICE_ROLE_KEY in client; only use it from server/Edge Functions.

## Choices made (updated)

- Frontend: Vite + React SPA using TanStack Router + TanStack Query (client-first).
- Local DB for dev: Prisma + SQLite (fast iteration).
- Production backend (optional): Supabase for Auth, Postgres, Storage, and Edge Functions.
- Map & UI: Leaflet + react-leaflet for maps, geofence circles, and user check-in flow.

## Further considerations

1. Anti-spoofing: require selfie or QR for high-trust check-ins; check `accuracy_meters` and reject if > 30m.
2. iOS limitations: background geofencing is unreliable in web apps; consider React Native later for background checks.
3. Privacy & compliance: add consent UI, retention policy, and data deletion flow.

## Next actions

1. Scaffold `src/lib/db.ts` adapter and `src/lib/supabase.ts` client (IN-PROGRESS).
2. Create `src/hooks/useGeolocation.ts`, `src/lib/queue.ts`, and a `src/routes/checkin.tsx` example route/component (IN-PROGRESS — Leaflet `CheckInMap` component prepared).
3. Add example Prisma migrations and seed for `sites`.
4. Add `src/components/CheckInMap.tsx` (Leaflet map + check-in button) and wire into `src/routes/checkin.tsx`.
5. Run local dev flow: `npx prisma migrate dev`, `npx prisma generate`, then `pnpm dev` and exercise a check-in (desktop geolocation simulation).

---

Last updated: 2026-04-26 (Leaflet chosen, DB adapter scaffold in progress)

## Database import: geopulse.sql

You provided a full SQL dump (`geopulse.sql`) containing the production schema and sample data. Key tables present:

- `admin`, `adminsession` — admin users + sessions
- `attendancelog` — attendance events (deviceLat/deviceLng, isMocked, status, timestamps)
- `attendee`, `attendeesession` — users + sessions
- `category` — classification for attendees
- `client`, `clientsession` — client users (creators/managers)
- `enrollment` — attendee ↔ geofence membership
- `geofence` — site definitions (latitude, longitude, radius, isActive)
- `organization` — org metadata
- `_prisma_migrations` — migration tracking (if present)

Mapping notes and recommended Prisma models (dev: SQLite; prod: Postgres/Supabase):

Prisma model suggestions (add to `prisma/schema.prisma` under your existing datasource):

```
model Admin {
   id          String   @id @default(uuid())
   email       String   @unique
   name        String
   passwordHash String
   orgCode     String?  @db.VarChar(191)
   createdAt   DateTime @default(now())
   updatedAt   DateTime
}

model AdminSession {
   id        String   @id @default(uuid())
   adminId   String
   token     String   @unique
   expiresAt DateTime
   createdAt DateTime @default(now())
}

model AttendanceLog {
   id              String   @id @default(uuid())
   attendeeId      String
   geofenceId      String
   action          String
   deviceLat       Float
   deviceLng       Float
   isMocked        Boolean  @default(false)
   status          String   @default("SUCCESS")
   timestamp       DateTime @default(now())
   afternoonTimeOut DateTime?
   morningTimeIn   DateTime?
   afternoonTimeIn DateTime?
   morningTimeOut  DateTime?
}

model Attendee {
   id          String   @id @default(uuid())
   email       String   @unique
   name        String
   passwordHash String
   orgCode     String?
   createdAt   DateTime @default(now())
   updatedAt   DateTime
   categoryId  String?
}

model Geofence {
   id        String   @id @default(uuid())
   name      String
   latitude  Float
   longitude Float
   radius    Int
   isActive  Boolean  @default(true)
   orgId     String
   createdByClientId String
   createdAt DateTime @default(now())
   updatedAt DateTime
}

model Enrollment {
   id String @id @default(uuid())
   attendeeId String
   geofenceId String
   createdAt DateTime @default(now())
}

model Organization {
   id String @id @default(uuid())
   name String
   orgCode String @unique
   createdAt DateTime @default(now())
   updatedAt DateTime
   isActive Boolean @default(true)
   defaultGeofenceId String?
}
```

Migration & seed options

- Option A (recommended): Translate the SQL schema into the Prisma models above, run migrations and create a `prisma/seed.ts` that inserts the sample rows (copy values from `geopulse.sql`). Then:

```bash
npx prisma migrate dev --name init
npx prisma generate
npm run db:seed
```

- Option B: If you want to run the provided SQL directly against a MySQL/MariaDB instance, import `geopulse.sql` into your local DB (e.g., `mysql -u root -p geopulse < geopulse.sql`) and then use `npx prisma db pull` to introspect and generate Prisma models for Postgres/MySQL. For Supabase (Postgres) you can convert or import SQL into the Supabase DB and `prisma db pull` against that connection.

Supabase notes

- If you move to Supabase Postgres for production, set `provider = "postgresql"` in `prisma/schema.prisma` and point `DATABASE_URL` at your Supabase Postgres connection. Use `prisma migrate deploy` on CI or `prisma db push` for iterative sync. Supabase allows direct SQL imports and you can use the provided dump as a reference for table structure and initial data.

Security & mapping reminders

- Sessions and tokens in `*_session` tables imply you may want to migrate to Supabase Auth for production rather than rolling your own session tokens.
- Store password hashes (bcrypt) exactly as in the SQL; ensure your auth flows verify using the same algorithm.

Updated next steps (short)

1. Add/adjust Prisma models in `prisma/schema.prisma` to match `geopulse.sql` (IN-PROGRESS).
2. Create `prisma/seed.ts` to populate initial rows (admin, sample geofence, attendee) from `geopulse.sql`.
3. Run migrations and verify with `pnpm dev`.

---

Created on: 2026-04-26
