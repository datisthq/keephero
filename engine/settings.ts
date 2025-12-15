export const AUTHORIZED_PARTIES = ["http://keephero.app"]
export const NATIVE_PREFIX = "/"
export const OPENAPI_PREFIX = "/api"
export const CORS_METHODS = ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"]

export const ENGINE_URL =
  import.meta.env?.VITE_ENGINE_URL ?? process.env.VITE_ENGINE_URL
