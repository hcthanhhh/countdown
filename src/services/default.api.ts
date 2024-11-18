import { HttpResponse } from '@/interfaces/common.interfaces';
import { Env } from '@/libs/Env.mjs';
import HttpService from './http.service';

const baseUrl = Env.NEXT_PUBLIC_BACKEND_API_URL + '/api';
class DefaultService {
  private apis = {
    apiKey: {
      root: 'merchant/api-key',
    },
  };

  getExample = async (params: any) => {
    const res = await HttpService.get<HttpResponse<any>>(
      // TODO
      `https://www.google.com`,
      params,
    );
    return res;
  };
}

export const defaultService = new DefaultService();
