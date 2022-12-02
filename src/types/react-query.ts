import { UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { QueryKey } from '@tanstack/query-core'

export interface ReactQueryOptions<TResponse, TData = TResponse> {
  options?: UseReactQueryOptions<TResponse, TData>
}

// TODO: figure out what's wrong with this querykey
export type UseReactQueryOptions<TResponse, TData = TResponse> = Omit<
  UseQueryOptions<TResponse, Error, TData, any>,
  'queryKey' | 'queryFn' | 'initialData'
>

export interface InfiniteReactQueryOptions<TResponse, TData = TResponse, TQueryData = TResponse> {
  options?: UseInfiniteReactQueryOptions<TResponse, TData, TQueryData>
}

export type UseInfiniteReactQueryOptions<TResponse, TData = TResponse, TQueryData = TResponse> = Omit<
  UseInfiniteQueryOptions<TResponse, Error, TData, TQueryData, any>,
  'queryKey' | 'queryFn' | 'getNextPageParam'
>

export type KeyedReactQueryOptions<TResponse = unknown, TQueryKey extends QueryKey = QueryKey> = Omit<
  UseQueryOptions<TResponse, Error, TResponse, TQueryKey>,
  'queryKey' | 'queryFn' | 'initialData'
> & {
  initialData?: () => undefined
}

export type UseExecuteMutationOptions<TParams, TResponse = ExecuteResult> = Omit<
  UseMutationOptions<TResponse, Error, TParams>,
  'mutationFn'
>
