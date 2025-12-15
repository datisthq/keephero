import { z } from "zod"
import { createLink } from "#actions/link/create.ts"
import { privateEndpoint } from "#endpoints/base/private.ts"

export const createLinkEndpoint = privateEndpoint
  .input(
    z.object({
      url: z.string(),
    }),
  )
  .output(
    z.object({
      userId: z.string(),
      url: z.string(),
    }),
  )
  .handler(async ({ input, context }) => {
    return await createLink(context, input.url)
  })
