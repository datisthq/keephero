import { z } from "zod"
import { countLinks } from "#actions/link/count.ts"
import { privateEndpoint } from "#endpoints/base/private.ts"
import { SearchConfig } from "#models/search.ts"

export const countLinksEndpoint = privateEndpoint
  .input(
    z.object({
      config: SearchConfig.optional(),
    }),
  )
  .output(z.number())
  .handler(async ({ input, context }) => {
    return await countLinks(context, input.config)
  })
