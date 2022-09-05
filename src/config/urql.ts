import { createClient, dedupExchange, cacheExchange, fetchExchange } from '@urql/core'
import { API_URL } from './lens'

export const client = createClient({
  url: API_URL,
  // - dedupExchange: deduplicates requests if we send the same queries twice
  // - cacheExchange: implements the default "document caching" behaviour
  // - fetchExchange: send our requests to the GraphQL API
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
})
