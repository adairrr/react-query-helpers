import { QueryStatus } from '@tanstack/react-query'

/**
 * Return a single query status for multiple queries.
 */
export const combinedQueriesStatus = (...statuses: QueryStatus[]): QueryStatus => {
  if (statuses.some((st) => st === 'loading')) {
    return 'loading'
  } else if (statuses.every((st) => st === 'success')) {
    return 'success'
  } else if (statuses.some((st) => st === 'error')) {
    return 'error'
  }
  return 'loading'
}
