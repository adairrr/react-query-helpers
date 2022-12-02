import { MutationStatus, QueryStatus } from '@tanstack/react-query'
import { combinedQueriesStatus } from '../queries/combinedQueriesStatus'

/**
 * Return a single query status for multiple queries.
 */
export const combinedMutationsStatus = (...statuses: MutationStatus[]): MutationStatus => {
  if (statuses.every((st) => st === 'idle')) {
    return 'success'
  }
  return combinedQueriesStatus(
    ...statuses.filter<QueryStatus>((status): status is QueryStatus => status !== 'idle'),
  )
}
