import * as enums from "#generated/enums.ts"

export const LanguageCodes = enums.LanguageCode
export type LanguageCode = (typeof LanguageCodes)[keyof typeof LanguageCodes]
