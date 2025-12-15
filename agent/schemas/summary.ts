// TODO: https://github.com/mastra-ai/mastra/issues/10116
// import { LanguageCodes, LinkTypes } from "@keephero/database"
import { z } from "zod"

export const Summary = z.object({
  // type: z.enum(LinkTypes),
  type: z.enum(["article", "video"]),
  // languageCode: z.enum(LanguageCodes),
  languageCode: z.string().lowercase().length(2),
  title: z.string().max(100),
  description: z.string().max(500),
  summary: z.string().max(10_000),
  readingTime: z.number().int().positive(),
  tags: z
    .array(
      z.object({
        keyword: z.string().lowercase(),
        emoji: z.string(),
      }),
    )
    .max(5),
})
