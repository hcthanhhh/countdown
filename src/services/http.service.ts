import { HttpMethod } from '@/common/enums';
import type { HttpRequest } from '@/interfaces/common.interfaces';
import HttpUtils from '@/utils/HttpUtils';

export default class HttpService {
  static get<TDataResponse = any>(
    url: string,
    body?: any,
    config?: Pick<HttpRequest, 'headers' | 'extraOptions'>,
  ) {
    const options: HttpRequest = {
      method: HttpMethod.GET,
      url,
      body,
      ...config,
    };
    return HttpUtils.request<TDataResponse>(options);
  }

  static post<TDataResponse = any>(
    url: string,
    body?: any,
    config?: Pick<HttpRequest, 'headers' | 'extraOptions'>,
  ) {
    const options: HttpRequest = {
      method: HttpMethod.POST,
      url,
      body,
      ...config,
    };
    return HttpUtils.request<TDataResponse>(options);
  }

  static postFormData<TDataResponse = any>(
    url: string,
    body?: any,
    config?: Pick<HttpRequest, 'headers' | 'extraOptions'>,
  ) {
    const options: HttpRequest = {
      method: HttpMethod.POST,
      url,
      body,
      ...config,
    };
    return HttpUtils.request<TDataResponse>(options, true);
  }

  static patch<TDataResponse = any>(
    url: string,
    body?: any,
    config?: Pick<HttpRequest, 'headers' | 'extraOptions'>,
  ) {
    const options: HttpRequest = {
      method: HttpMethod.PATCH,
      url,
      body,
      ...config,
    };
    return HttpUtils.request<TDataResponse>(options);
  }

  static put<TDataResponse = any>(
    url: string,
    body?: any,
    config?: Pick<HttpRequest, 'headers' | 'extraOptions'>,
  ) {
    const options: HttpRequest = {
      method: HttpMethod.PUT,
      url,
      body,
      ...config,
    };
    return HttpUtils.request<TDataResponse>(options);
  }

  static delete<TDataResponse = any>(
    url: string,
    body?: any,
    config?: Pick<HttpRequest, 'headers' | 'extraOptions'>,
  ) {
    const options: HttpRequest = {
      method: HttpMethod.DELETE,
      url,
      body,
      ...config,
    };
    return HttpUtils.request<TDataResponse>(options);
  }
}
