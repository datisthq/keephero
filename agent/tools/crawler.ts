import { createTool } from "@mastra/core/tools"
import { Content } from "../schemas/content.ts"
import { Url } from "../schemas/url.ts"
import { crawler } from "../services/crawler.ts"

export const crawlerTool = createTool({
  id: "crawler",
  description: "Crawl a content from a link",
  inputSchema: Url,
  outputSchema: Content,
  execute: async url => {
    const response = await crawler.scrape(url, {
      formats: ["markdown"],
      timeout: 10_000,
    })

    if (!response.markdown) {
      throw new Error("No content found")
    }

    return response.markdown
  },
})
