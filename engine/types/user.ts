import type { CheckAuthorizationFromSessionClaims } from "@clerk/shared/types"

export type User = {
  id: string
  has: CheckAuthorizationFromSessionClaims
}
