import { onError } from "@orpc/server"
import { RPCHandler } from "@orpc/server/fetch"
import { CORSPlugin } from "@orpc/server/plugins"
import { router } from "#router.ts"
import { createDatabaseServiceFromEnv } from "#services/database.ts"
import { logger } from "#services/logger.ts"
import * as settings from "#settings.ts"

export async function nativeRequestHandler(request: Request, env: Env) {
  const database = await createDatabaseServiceFromEnv(env)

  const { response } = await nativeHandler.handle(request, {
    // TODO: can be fixed?
    // We clone request as Clerk tries to read already streamed request
    context: { request: request.clone() as Request, database },
    prefix: settings.NATIVE_PREFIX,
  })

  return response
}

export const nativeHandler = new RPCHandler(router, {
  plugins: [
    new CORSPlugin({
      allowMethods: settings.CORS_METHODS,
      exposeHeaders: ["Content-Disposition"],
    }),
  ],
  interceptors: [
    onError(error => {
      logger.error(String(error))
    }),
  ],
})
