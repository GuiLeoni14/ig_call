-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);
INSERT INTO "new_Sessions" ("expires", "id", "session_token", "user_id") SELECT "expires", "id", "session_token", "user_id" FROM "Sessions";
DROP TABLE "Sessions";
ALTER TABLE "new_Sessions" RENAME TO "Sessions";
CREATE UNIQUE INDEX "Sessions_session_token_key" ON "Sessions"("session_token");
CREATE INDEX "Sessions_user_id_idx" ON "Sessions"("user_id");
CREATE TABLE "new_Accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT
);
INSERT INTO "new_Accounts" ("access_token", "expires_at", "id", "id_token", "provider", "provider_account_id", "refresh_token", "scope", "session_state", "token_type", "type", "user_id") SELECT "access_token", "expires_at", "id", "id_token", "provider", "provider_account_id", "refresh_token", "scope", "session_state", "token_type", "type", "user_id" FROM "Accounts";
DROP TABLE "Accounts";
ALTER TABLE "new_Accounts" RENAME TO "Accounts";
CREATE INDEX "Accounts_user_id_idx" ON "Accounts"("user_id");
CREATE UNIQUE INDEX "Accounts_provider_provider_account_id_key" ON "Accounts"("provider", "provider_account_id");
CREATE TABLE "new_schedulings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "observations" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL
);
INSERT INTO "new_schedulings" ("created_at", "date", "email", "id", "name", "observations", "user_id") SELECT "created_at", "date", "email", "id", "name", "observations", "user_id" FROM "schedulings";
DROP TABLE "schedulings";
ALTER TABLE "new_schedulings" RENAME TO "schedulings";
CREATE INDEX "schedulings_user_id_idx" ON "schedulings"("user_id");
CREATE TABLE "new_user_time_intervals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "week_day" INTEGER NOT NULL,
    "time_start_in_minutes" INTEGER NOT NULL,
    "time_end_in_minutes" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL
);
INSERT INTO "new_user_time_intervals" ("id", "time_end_in_minutes", "time_start_in_minutes", "user_id", "week_day") SELECT "id", "time_end_in_minutes", "time_start_in_minutes", "user_id", "week_day" FROM "user_time_intervals";
DROP TABLE "user_time_intervals";
ALTER TABLE "new_user_time_intervals" RENAME TO "user_time_intervals";
CREATE INDEX "user_time_intervals_user_id_idx" ON "user_time_intervals"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
