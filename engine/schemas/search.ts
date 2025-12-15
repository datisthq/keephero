import { z } from "zod"

export type SearchConfig = z.infer<typeof SearchConfig>
export const SearchConfig = z.object({
  isFavorite: z.boolean().optional(),
  offset: z.number().optional(),
  limit: z.number().optional(),
})
