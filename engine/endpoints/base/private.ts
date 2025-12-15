import { userMiddleware } from "#middlewares/user.ts"
import { publicEndpoint } from "./public.ts"

export const privateEndpoint = publicEndpoint.use(userMiddleware)
