import * as enums from "#generated/enums.ts"

export const LinkTypes = enums.LinkType
export type LinkType = (typeof LinkTypes)[keyof typeof LinkTypes]
