import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely"
import pg from "pg"
import pgvector from "pgvector/pg"
import type { DB } from "#generated/tables.ts"
import { logger } from "#services/logger.ts"

export type Database = Kysely<DatabaseSchema>

export type DatabaseSchema = DB & {
  page: DB["page"] & { embedding: number[] }
  link: DB["link"] & { embedding: number[] }
}

export function createDatabaseService(options?: { databaseUrl?: string }) {
  const connectionString = options?.databaseUrl ?? process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("Missing environment variable: DATABASE_URL")
  }

  // https://developers.cloudflare.com/hyperdrive/examples/connect-to-postgres
  const pool = new pg.Pool({
    connectionString,
    max: 5,
  })

  pg.types.setTypeParser(pg.types.builtins.INT8, Number.parseInt)
  pg.types.setTypeParser(pg.types.builtins.FLOAT8, Number.parseFloat)
  pg.types.setTypeParser(pg.types.builtins.NUMERIC, Number.parseFloat)

  pool.on("connect", async client => {
    await pgvector.registerTypes(client)
  })

  const database = new Kysely<DatabaseSchema>({
    dialect: new PostgresDialect({ pool }),
    plugins: [new CamelCasePlugin()],
    log(event) {
      if (event.level === "query") {
        logger.debug(event.query.sql)
      } else if (event.level === "error") {
        logger
          .withMetadata({
            params: event.query.parameters,
            durationMs: event.queryDurationMillis,
          })
          .error(event.query.sql)
      }
    },
  })

  return database
}
