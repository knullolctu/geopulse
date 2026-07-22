-- GeoPulse Supabase PostgreSQL Schema & Initial Data
-- Paste this script directly into Supabase Dashboard -> SQL Editor and click RUN

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS "admin" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "birthDate" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "adminsession" (
  "id" TEXT PRIMARY KEY,
  "adminId" TEXT NOT NULL,
  "token" TEXT UNIQUE NOT NULL,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "organization" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "orgCode" TEXT UNIQUE NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "requestedById" TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "category" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "orgId" TEXT NOT NULL REFERENCES "organization"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "client" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "orgCode" TEXT REFERENCES "organization"("orgCode") ON DELETE SET NULL,
  "isVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  "birthDate" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "clientsession" (
  "id" TEXT PRIMARY KEY,
  "clientId" TEXT NOT NULL,
  "token" TEXT UNIQUE NOT NULL,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "attendee" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "orgCode" TEXT REFERENCES "organization"("orgCode") ON DELETE SET NULL,
  "categoryId" TEXT REFERENCES "category"("id") ON DELETE SET NULL,
  "isVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  "birthDate" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "attendeesession" (
  "id" TEXT PRIMARY KEY,
  "attendeeId" TEXT NOT NULL,
  "token" TEXT UNIQUE NOT NULL,
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "geofence" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "latitude" DOUBLE PRECISION NOT NULL,
  "longitude" DOUBLE PRECISION NOT NULL,
  "radius" INT NOT NULL,
  "orgId" TEXT NOT NULL REFERENCES "organization"("id") ON DELETE CASCADE,
  "createdByClientId" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "attendancelog" (
  "id" TEXT PRIMARY KEY,
  "attendeeId" TEXT NOT NULL REFERENCES "attendee"("id") ON DELETE CASCADE,
  "geofenceId" TEXT NOT NULL REFERENCES "geofence"("id") ON DELETE CASCADE,
  "action" TEXT NOT NULL,
  "deviceLat" DOUBLE PRECISION NOT NULL,
  "deviceLng" DOUBLE PRECISION NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'SUCCESS',
  "timestamp" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "morningTimeIn" TIMESTAMPTZ,
  "morningTimeOut" TIMESTAMPTZ,
  "afternoonTimeIn" TIMESTAMPTZ,
  "afternoonTimeOut" TIMESTAMPTZ,
  "isMock" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS "enrollment" (
  "id" TEXT PRIMARY KEY,
  "attendeeId" TEXT NOT NULL REFERENCES "attendee"("id") ON DELETE CASCADE,
  "geofenceId" TEXT NOT NULL REFERENCES "geofence"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Seed Default Accounts & Organizations
INSERT INTO "admin" ("id", "email", "name", "passwordHash", "createdAt", "updatedAt") VALUES
('knullol-112822', 'knull.admin@geopulse.io', 'Knull Admin', '$2b$10$K.3/CVdB8BSsESMuO1vqFOefJ9I1Xkb.hyGYVGRXRG7gDF0yF2c/y', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "organization" ("id", "name", "description", "orgCode", "isActive", "createdAt", "updatedAt") VALUES
('org-1', 'Acme Geopulse Corp', 'Main testing organization', 'ACME123', true, NOW(), NOW()),
('org-2', 'Global Tech Solutions', 'Secondary organization', 'GTS456', true, NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "client" ("id", "email", "name", "passwordHash", "orgCode", "isVerified", "createdAt", "updatedAt") VALUES
('client-1', 'client@acme123.io', 'Acme Manager', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', true, NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "attendee" ("id", "email", "name", "passwordHash", "orgCode", "isVerified", "createdAt", "updatedAt") VALUES
('att-1', 'user1@acme123.io', 'Acme Employee 1', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', true, NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;
