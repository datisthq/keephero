import type { Database, LanguageCode } from "@keephero/database"

type Context = {
  database: Database
}

type NewTag = {
  languageCode: LanguageCode
  keyword: string
  emoji: string
}

export async function createTags(context: Context, newTags: NewTag[]) {
  const { database } = context

  if (newTags.length === 0) {
    return []
  }

  const tags = await database
    .insertInto("tag")
    .values(
      newTags.map(tag => ({
        slug: `${tag.languageCode}-${tag.keyword}`,
        languageCode: tag.languageCode,
        keyword: tag.keyword,
        emoji: tag.emoji,
      })),
    )
    // Update is required to ensure it returns a row
    .onConflict(oc =>
      oc.columns(["slug"]).doUpdateSet({
        updatedAt: new Date(),
      }),
    )
    .returningAll()
    .execute()

  return tags
}
