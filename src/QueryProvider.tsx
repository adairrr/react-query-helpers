import React, { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'

interface QueryClientProviderProps {
  queryClient: QueryClient
}

/**
 * This should NOT be necessary but seems to be required to get the anything to work at all.
 * Developer hours wasted: 18
 */
export const QueryClientProvider: FC<PropsWithChildren<QueryClientProviderProps>> = ({
  queryClient,
  children,
}) => {
  return (
    <ReactQueryClientProvider client={queryClient} contextSharing={true}>
      {children}
    </ReactQueryClientProvider>
  )
}
