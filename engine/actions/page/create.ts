import type { Database } from "@keephero/database"
import pgvector from "pgvector/kysely"
import { agent } from "#services/agent.ts"

type Context = {
  database: Database
}

export async function createPage(context: Context, url: string) {
  const { database } = context

  // TODO: handle errored pages

  const indexedPage = await database
    .selectFrom("page")
    .selectAll()
    .where("url", "=", url)
    .executeTakeFirst()

  if (indexedPage) {
    return indexedPage
  }

  const workflow = agent.getWorkflow("linkWorkflow")
  const run = await workflow.createRun()
  const response = await run.start({
    inputData: url,
  })

  if (response.status !== "success") {
    throw new Error("Failed to create a page")
  }

  const page = await database
    .insertInto("page")
    .values({
      url,
      content: response.result.content,
      embedding: pgvector.toSql(response.result.embedding),
      ...response.result.summary,
      // @ts-expect-error
      tags: JSON.stringify(response.result.summary.tags),
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  return page
}
