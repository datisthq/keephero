import { countLinksEndpoint } from "#endpoints/link/count.ts"
import { createLinkEndpoint } from "#endpoints/link/create.ts"
import { searchLinksEndpoint } from "#endpoints/link/search.ts"

export const router = {
  link: {
    create: createLinkEndpoint,
    count: countLinksEndpoint,
    search: searchLinksEndpoint,
  },
}

export type Router = typeof router
