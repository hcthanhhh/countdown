import { getSession, signOut } from 'next-auth/react';
import querystring from 'querystring';

import { HttpMethod, StatusCode } from '@/common/enums';
import type { HttpRequest } from '@/interfaces/common.interfaces';

export default class HttpUtils {
  static async request<TDataResponse = any>(init: HttpRequest, isFormData = false) {
    const session = await getSession();

    try {
      const defaultHeaders = {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken} ` || '',
      };
      const { url, method = HttpMethod.GET, body, headers, extraOptions } = init;

      const requestInit: Pick<HttpRequest, 'body' | 'headers' | 'method' | 'extraOptions'> = {
        method,
        headers: {
          ...defaultHeaders,
          ...headers,
        },
        ...extraOptions,
      };
      let reqURL = url;
      if (body) {
        switch (method) {
          case HttpMethod.PUT:
          case HttpMethod.PATCH:
          case HttpMethod.POST:
          case HttpMethod.DELETE:
            requestInit.body = JSON.stringify(body);
            break;
          default:
            reqURL = `${url}?${querystring.stringify(body)}`;
            break;
        }
      }
      let res: Response;
      if (isFormData) {
        res = await fetch(reqURL, {
          method,
          body,
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken} ` || '',
            ...headers,
          },
        });
      } else {
        res = await fetch(reqURL, requestInit);
      }

      if (res.ok) {
        const result: TDataResponse = await res.json();
        return result;
      }
      return await Promise.reject(await res.json());
    } catch (error: any) {
      console.error('error http', error);
      switch (error.code) {
        case StatusCode.Unauthorized:
          signOut();
          break;

        default:
          break;
      }
      return Promise.reject(error);
    }
  }
}
