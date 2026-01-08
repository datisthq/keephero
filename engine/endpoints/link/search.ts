import { z } from "zod"
import { searchLinks } from "#actions/link/search.ts"
import { privateEndpoint } from "#endpoints/base/private.ts"
import { SearchConfig } from "#models/search.ts"

export const searchLinksEndpoint = privateEndpoint
  .input(
    z.object({
      config: SearchConfig.optional(),
    }),
  )
  .output(
    z.array(
      z.object({
        url: z.string(),
        title: z.string(),
        readingTime: z.number(),
        isFavorite: z.boolean().nullable(),
        tags: z.array(
          z.object({
            slug: z.string(),
            keyword: z.string(),
            emoji: z.string(),
          }),
        ),
      }),
    ),
  )
  .handler(async ({ input, context }) => {
    return await searchLinks(context, input.config)
  })
