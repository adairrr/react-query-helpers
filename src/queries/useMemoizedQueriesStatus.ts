import { QueryStatus } from '@tanstack/react-query'
import { useMemo } from 'react'
import { combinedQueriesStatus } from './combinedQueriesStatus'

/**
 * If there are a large amount of queries, pass them into this hook to memoize their status.
 * @param statuses
 */
export const useMemoizedQueriesStatus = (...statuses: QueryStatus[]): QueryStatus => {
  return useMemo<QueryStatus>(() => combinedQueriesStatus(...statuses), [statuses])
}
