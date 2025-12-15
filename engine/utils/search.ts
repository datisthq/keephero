import type { DatabaseSchema } from "@keephero/database"
import type { SelectQueryBuilder } from "kysely"
import type { SearchConfig } from "#schemas/search.ts"

export function applySearchConfig<O>(
  query: SelectQueryBuilder<DatabaseSchema, "link", O>,
  config?: SearchConfig,
) {
  let result = query

  if (config?.isFavorite) {
    result = result.where("isFavorite", "is", config.isFavorite)
  }

  return result
}
