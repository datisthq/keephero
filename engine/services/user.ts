import { createClerkClient } from "@clerk/backend"

// TODO: Add jwtKey
// https://clerk.com/docs/guides/sessions/manual-jwt-verification
export const user = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
})
