import { z } from "zod"

export const Embedding = z.array(z.number())
