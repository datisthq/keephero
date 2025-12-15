import * as enums from "#generated/enums.ts"

export const FeedTypes = enums.FeedType
export type FeedType = (typeof FeedTypes)[keyof typeof FeedTypes]
