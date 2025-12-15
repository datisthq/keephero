import { ORPCError, os } from "@orpc/server"
import { user } from "#services/user.ts"
import * as settings from "#settings.ts"

export const userMiddleware = os
  .$context<{
    request: Request
  }>()
  .middleware(async ({ next, context }) => {
    const request = new Request(context.request.url, {
      method: context.request.method,
      headers: context.request.headers,
    })

    const { toAuth } = await user.authenticateRequest(request, {
      authorizedParties: import.meta.env.PROD
        ? settings.AUTHORIZED_PARTIES
        : undefined,
    })

    const auth = toAuth()
    if (!auth?.isAuthenticated) {
      throw new ORPCError("UNAUTHORIZED")
    }

    const result = await next({
      context: {
        user: { id: auth.userId, has: auth.has },
      },
    })

    return result
  })
