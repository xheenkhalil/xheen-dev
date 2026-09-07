/**
 * Drizzle ORM client — dual-engine, same pattern as `@/lib/db`.
 *
 * - **Neon** (production): `drizzle-orm/node-postgres` over the existing `pg.Pool`.
 * - **PGLite** (preview / no DATABASE_URL): `drizzle-orm/pglite` over the
 *   shared in-memory instance from `@/lib/db`.
 *
 * Migrations are handled by the existing system (`migrations/*.sql`).
 * This module only provides the typed query client.
 */
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { PgliteDatabase } from "drizzle-orm/pglite";
import * as schema from "./schema";

export type DrizzleDb =
  | NodePgDatabase<typeof schema>
  | PgliteDatabase<typeof schema>;

const rawDatabaseUrl =
  typeof process !== "undefined" ? process.env.DATABASE_URL : undefined;
const databaseUrl =
  rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : undefined;

const globalRef = globalThis as typeof globalThis & {
  __drizzleDbPromise__?: Promise<DrizzleDb>;
};

async function createDrizzleNeon(): Promise<DrizzleDb> {
  const { Pool, types } = await import("pg");
  // int8 → number (same normalization as db.ts)
  types.setTypeParser(20, Number);
  const pool = new Pool({ connectionString: databaseUrl });
  const { drizzle } = await import("drizzle-orm/node-postgres");
  return drizzle(pool, { schema });
}

async function createDrizzlePglite(): Promise<DrizzleDb> {
  // Reuse the shared PGLite instance (which has migrations applied)
  const { getPglite } = await import("@/lib/db");
  const pg = await getPglite();
  const { drizzle } = await import("drizzle-orm/pglite");
  return drizzle(pg, { schema }) as unknown as DrizzleDb;
}

/**
 * Get the shared Drizzle client. Memoized — safe to call per request.
 * Ensure `ensureDbReady()` from `@/lib/db` has been called before first use
 * (it is, via the Vite plugin and production module bootstrap).
 */
export function getDb(): Promise<DrizzleDb> {
  if (typeof window !== "undefined") {
    throw new Error(
      "getDb() is server-only — call from a createServerFn handler or loader.",
    );
  }
  globalRef.__drizzleDbPromise__ ??= (databaseUrl
    ? createDrizzleNeon()
    : createDrizzlePglite()
  ).catch((err) => {
    globalRef.__drizzleDbPromise__ = undefined;
    throw err;
  });
  return globalRef.__drizzleDbPromise__;
}
