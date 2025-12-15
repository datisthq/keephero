import type { Database } from "@keephero/database"
import type { SearchConfig } from "#schemas/search.ts"
import type { User } from "#types/user.ts"
import { applySearchConfig } from "#utils/search.ts"

type Context = {
  database: Database
  user: User
}

export async function countLinks(context: Context, config?: SearchConfig) {
  const { database, user } = context

  let query = database
    .selectFrom("link")
    .select(eb => eb.fn.countAll().as("count"))
    .where("userId", "=", user.id)

  if (config) {
    query = applySearchConfig(query, config)
  }

  const result = await query.executeTakeFirstOrThrow()
  return Number(result.count)
}
