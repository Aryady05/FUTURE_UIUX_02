import { Pool, QueryResultRow } from "pg";

import { env, hasDatabase } from "./env";

export const pool = hasDatabase ? new Pool({ connectionString: env.databaseUrl }) : null;

export async function query<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  if (!pool) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return pool.query<T>(text, params);
}
