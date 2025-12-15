import type { Database } from "@keephero/database"
import { jsonArrayFrom } from "kysely/helpers/postgres"
import type { SearchConfig } from "#schemas/search.ts"
import type { User } from "#types/user.ts"
import { applySearchConfig } from "#utils/search.ts"

type Context = {
  database: Database
  user: User
}

export async function searchLinks(context: Context, config?: SearchConfig) {
  const { database, user } = context

  let query = database
    .selectFrom("link")
    .selectAll("link")
    .select(eb =>
      jsonArrayFrom(
        eb
          .selectFrom("linkTag")
          .innerJoin("tag", "tag.slug", "linkTag.tagSlug")
          .select(["tag.slug", "tag.keyword", "tag.emoji"])
          .whereRef("linkTag.userId", "=", "link.userId")
          .whereRef("linkTag.url", "=", "link.url"),
      ).as("tags"),
    )
    .where("userId", "=", user.id)

  if (config) {
    query = applySearchConfig(query, config)
  }

  const links = await query
    .offset(config?.offset ?? 0)
    .limit(config?.limit ?? 20)
    .execute()

  return links
}
