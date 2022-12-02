import { defaultContext, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { MutationOptions } from '@tanstack/query-core'
import { UseExecuteMutationOptions } from '../types'
import { ContextOptions } from '@tanstack/react-query/src/types'

/**
 * Use this hook with the react-query callbacks to merge with the default behavior, otherwise it is
 * overridden.
 * @todo figure out how to wrap the entire options instead of individuals!
 */
export const useMutationOptionsMerger = ({ context }: ContextOptions = { context: defaultContext }) => {
  const queryClient = useQueryClient({ context })
  const mutationOptions = queryClient.getDefaultOptions().mutations

  return useMemo(
    () => ({
      onMutate:
        <TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown>(
          callback: MutationOptions<TData, TError, TVariables, TContext>['onMutate'],
        ) =>
          (variables: TVariables) => {
            mutationOptions?.onMutate?.(variables)
            return callback?.(variables)
          },
      onSuccess:
        <TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown>(
          callback: MutationOptions<TData, TError, TVariables, TContext>['onSuccess'],
        ) =>
          (
            data: TData,
            variables: TVariables,
            context: TContext | undefined,
          ): Promise<unknown> | unknown => {
            mutationOptions?.onSuccess?.(data, variables, context)
            return callback?.(data, variables, context)
          },
      onError:
        <TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown>(
          callback: MutationOptions<TData, TError, TVariables, TContext>['onError'],
        ) =>
          (
            error: TError,
            variables: TVariables,
            context: TContext | undefined,
          ): Promise<unknown> | unknown => {
            mutationOptions?.onError?.(error, variables, context)
            return callback?.(error, variables, context)
          },
      onSettled:
        <TData = unknown, TError = unknown, TVariables = unknown, TContext = unknown>(
          callback: MutationOptions<TData, TError, TVariables, TContext>['onSettled'],
        ) =>
          (
            data: TData | undefined,
            error: TError | null,
            variables: TVariables,
            context: TContext | undefined,
          ): Promise<unknown> | unknown => {
            mutationOptions?.onSettled?.(data, error, variables, context)
            return callback?.(data, error, variables, context)
          },
    }),
    [mutationOptions],
  )
}
/**
 * Hook that will return UseExecuteMutationOptions with the defaults.
 */
export const useMergeDefaultMutationOptions = ({ context }: ContextOptions = { context: defaultContext }) => {
  const defaultWrap = useMutationOptionsMerger({ context })

  const merge = <TParams, TResponse>(
    options?: UseExecuteMutationOptions<TParams, TResponse>,
  ): UseExecuteMutationOptions<TParams, TResponse> => ({
    ...options,
    onSuccess: defaultWrap.onSuccess(options?.onSuccess),
    onError: defaultWrap.onError(options?.onError),
    onMutate: defaultWrap.onMutate(options?.onMutate),
    onSettled: defaultWrap.onSettled(options?.onSettled),
  })

  return {
    mergeWithDefaults: merge,
  }
}
