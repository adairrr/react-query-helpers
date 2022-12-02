export const RefetchOptions = {
  DEFAULT: /* onMount, onFocus */ {},
  NEVER: {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  },
}

export const QueryOptions = {
  DISABLE_WITHOUT: (obj: any, enabled?: boolean) => ({
    enabled: !!obj && (enabled != undefined ? enabled : true),
  }),
}
