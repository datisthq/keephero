import { createStep, createWorkflow } from "@mastra/core/workflows"
import { z } from "zod"
import { Content } from "../schemas/content.ts"
import { Embedding } from "../schemas/embedding.ts"
import { Summary } from "../schemas/summary.ts"
import { Url } from "../schemas/url.ts"
import { crawlerTool } from "../tools/crawler.ts"
import { vectorTool } from "../tools/vector.ts"

const crawlerStep = createStep(crawlerTool)
const vectorStep = createStep(vectorTool)

const summaryStep = createStep({
  id: "summary",
  inputSchema: Content,
  outputSchema: Summary,
  execute: async ({ getInitData, inputData, mastra }) => {
    const url = getInitData()
    const content = inputData

    const summaryAgent = mastra.getAgent("summaryAgent")

    const response = await summaryAgent.generate([url, content], {
      structuredOutput: {
        schema: Summary,
      },
    })

    return response.object
  },
})

export const linkWorkflow = createWorkflow({
  id: "link",
  inputSchema: Url,
  outputSchema: z.object({
    content: Content,
    embedding: Embedding,
    summary: Summary,
  }),
})
  .then(crawlerStep)
  .parallel([vectorStep, summaryStep])
  .map(async ({ getStepResult }) => {
    const content = getStepResult("crawler")
    const embedding = getStepResult("vector")
    const summary = getStepResult("summary")

    return { content, embedding, summary }
  })
  .commit()
