import type { UseMutationOptions, UseMutationResult } from 'react-query';
import { useMutation } from 'react-query';

import type { HttpError, HttpResponse } from '@/interfaces/common.interfaces';

export function useMutationCustom<TData = any, TVariables = any, TContext = unknown>(
  mutationFn: any,
  options?: Omit<
    UseMutationOptions<HttpResponse<TData>, HttpError<any>, TVariables, TContext>,
    'mutationFn'
  >,
): UseMutationResult<HttpResponse<TData>, HttpError<any>, TVariables, TContext> {
  return useMutation(mutationFn, options);
}
