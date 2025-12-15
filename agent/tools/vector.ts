import { openai } from "@ai-sdk/openai"
import { createTool } from "@mastra/core/tools"
import { embed } from "ai"
import { Content } from "../schemas/content.ts"
import { Embedding } from "../schemas/embedding.ts"

export const vectorTool = createTool({
  id: "vector",
  description: "Create a vector from a content",
  inputSchema: Content,
  outputSchema: Embedding,
  execute: async content => {
    const result = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: content,
      maxRetries: 2, // optional, defaults to 2
    })

    return result.embedding
  },
})
