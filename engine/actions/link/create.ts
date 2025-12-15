import type { Database } from "@keephero/database"
import pgvector from "pgvector/kysely"
import { createPage } from "#actions/page/create.ts"
import { createTags } from "#actions/tag/create.ts"
import type { User } from "#types/user.ts"
import { createSlug } from "#utils/slug.ts"

// TODO: normalize url

type Context = {
  database: Database
  user: User
}

export async function createLink(context: Context, url: string) {
  const { database, user } = context

  const existingLink = await database
    .selectFrom("link")
    .selectAll()
    .where("userId", "=", user.id)
    .where("url", "=", url)
    .executeTakeFirst()

  if (existingLink) {
    return existingLink
  }

  const page = await createPage(context, url)
  const tags = await createTags(
    context,
    page.tags.map(tag => ({
      languageCode: page.languageCode,
      keyword: tag.keyword,
      emoji: tag.emoji,
    })),
  )

  const slug = createSlug(page.title, {
    unique: true,
    languageCode: page.languageCode,
  })

  const link = await database.transaction().execute(async trx => {
    const link = await trx
      .insertInto("link")
      .values({
        slug,
        ...page,
        userId: user.id,
        embedding: pgvector.toSql(page.embedding),
      })
      // Update is required to ensure it returns a row
      .onConflict(oc =>
        oc.columns(["userId", "url"]).doUpdateSet({
          updatedAt: new Date(),
        }),
      )
      .returningAll()
      .executeTakeFirstOrThrow()

    if (tags.length) {
      await trx
        .insertInto("linkTag")
        .values(tags.map(tag => ({ userId: user.id, url, tagSlug: tag.slug })))
        .onConflict(oc => oc.columns(["userId", "url", "tagSlug"]).doNothing())
        .execute()
    }

    return link
  })

  return link
}
