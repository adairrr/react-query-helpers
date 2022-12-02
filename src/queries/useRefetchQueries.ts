import { useQueryClient } from '@tanstack/react-query'
import { isNil, omitBy } from 'lodash'

/**
 * Hook to refetch our generated queries
 * Ex:
 * refetchQueries(cw20QueryKeys.balance(shareTokenAddress))
 */
export const useRefetchQueries = () => {
  const queryClient = useQueryClient()

  const refetchQueries = (queryKey: readonly object[]) =>
    queryClient.invalidateQueries({queryKey: [omitBy(queryKey[0], isNil)], exact: false})

  return {
    refetchQueries,
  }
}
