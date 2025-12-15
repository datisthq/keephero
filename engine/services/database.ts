import { createDatabaseService } from "@keephero/database"

export async function createDatabaseServiceFromEnv(env?: Env) {
  const database = createDatabaseService({
    databaseUrl: env?.DATABASE.connectionString,
  })

  return database
}
