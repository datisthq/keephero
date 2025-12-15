import { Mastra } from "@mastra/core/mastra"
import { summaryAgent } from "./agents/summary.ts"
import { linkWorkflow } from "./workflows/link.ts"

export function createAgentService() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing environment variable: OPENAI_API_KEY")
  }

  if (!process.env.FIRECRAWL_API_KEY) {
    throw new Error("Missing environment variable: FIRECRAWL_API_KEY")
  }

  return new Mastra({
    agents: { summaryAgent },
    workflows: { linkWorkflow },
    server: {
      port: 3000,
    },
  })
}
