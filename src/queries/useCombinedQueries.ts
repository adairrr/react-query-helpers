import { useCallback, useMemo } from 'react'
import { RefetchOptions } from '@tanstack/query-core'
import { QueryStatus, RefetchQueryFilters, UseQueryResult } from '@tanstack/react-query'
import { useArrayMemo } from '../helpers/useArrayMemo'
import { useMemoizedQueriesStatus } from './useMemoizedQueriesStatus'

export interface CombinedQueries<TData = unknown, TKey = unknown> {
  status: QueryStatus
  refetch: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<void>
  remove: () => void
  datas: Array<TData>
  dataMap: Map<TKey, TData | undefined>
}

/**
 * Hook that combines fields from useQueries.
 * Key and data are "backwards" so that we can specify a single type.
 */
export const useCombinedQueries = <TData = unknown, TKey = unknown>({
  keys,
  additionalRefetch,
  queries,
}: {
  keys: readonly TKey[]
  additionalRefetch?: () => void
  queries: UseQueryResult<TData, unknown>[]
}): CombinedQueries<TData, TKey> => {
  const statuses = useArrayMemo<QueryStatus>(queries.map((q) => q.status))
  const status = useMemoizedQueriesStatus(...statuses)

  const refetches = useArrayMemo(queries.map((q) => q.refetch))
  const refetch = useCallback(
    <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) =>
      Promise.all(refetches.map((refetch) => refetch(options))).then(additionalRefetch),
    [additionalRefetch, refetches]
  )

  const removes = useArrayMemo(queries.map((q) => q.remove))
  const remove = useCallback(() => removes.forEach((remove) => remove()), [removes])

  const allDatas = useArrayMemo(queries.map((q) => q.data))
  // zip the keys with the data TODO: deprecate
  const dataMap = useMemo(
    () => new Map<TKey, TData | undefined>(keys.map((k, i) => [k, allDatas[i]])),
    [keys, allDatas]
  )

  // filter out undefined
  const cleanDatas = useArrayMemo(queries.map((q) => q.data).filter<TData>((d): d is TData => !!d))

  return useMemo<CombinedQueries<TData, TKey>>(
    () => ({
      statuses,
      status,
      datas: cleanDatas,
      dataMap,
      refetch,
      remove,
    }),
    [statuses, status, dataMap, cleanDatas, refetch, remove]
  )
}
