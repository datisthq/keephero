import slugify from "@sindresorhus/slugify"
import { nanoid } from "nanoid"

export function createSlug(
  text: string,
  options?: {
    unique?: boolean
    languageCode?: string
  },
) {
  const { unique, languageCode } = options || {}

  let slug = slugify(text, { locale: languageCode })
  if (unique) {
    slug = `${slug}-${nanoid(5)}`
  }

  return slug
}
