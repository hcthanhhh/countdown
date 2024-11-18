import type { QueryKey, UseQueryOptions, UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';

import type { HttpError, HttpResponse } from '@/interfaces/common.interfaces';

export function useQueryCustom<
  TData = any,
  TQueryFnData = any,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: any,
  options?: Omit<
    UseQueryOptions<TQueryFnData, HttpError<any>, HttpResponse<TData>, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<HttpResponse<TData>, HttpError<any>> {
  return useQuery(queryKey, queryFn, options);
}
