import type { HttpMethod } from '@/common/enums';

/* ----------------------------- MENU DASHBOARD ----------------------------- */
export type MenuItemDashboard = {
  type?: 'divider' | 'group';
  label?: React.ReactNode;
  key: string | number;
  icon?: React.ReactNode;
  children?: MenuItemDashboard[];
  path?: string;
  // roles: ROLE_TYPE[];
  // access?: PERMISSION_TYPE;
  isDisabled?: boolean;
  parentKey?: string | number;
};

/* ------------------------------ OPTION SELECT ----------------------------- */
export type IOption<T = string> = {
  label: string;
  value: T;
  disabled?: boolean;
};

/* ---------------------------------- HTTP ---------------------------------- */
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
export interface HttpRequest {
  url: string;
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: any;
  extraOptions?: Omit<RequestInit, 'body' | 'method' | 'headers'>;
}

export interface HttpResponse<TData = any> {
  success: boolean;
  ercd?: number;
  desc?: string;
  data: TData;
  meta?: IResponseMeta;
  message?: string;
}

export interface IResponseMeta {
  total: number;
  totalSuccess?: number;
  totalError?: number;
  page: number;
  size: number;
  sessionId?: string;
}

export interface HttpError<TData = any> {
  success: boolean;
  code?: number;
  message?: string;
  data?: TData;
  meta?: IResponseMeta;
}

/* ------------------------------- PAGINATION ------------------------------- */
export interface GetDataPagination<T = any> {
  searchKey?: keyof T;
  searchValue?: string;
  // sortKey?: string;
  // sortValue?: 'asc' | 'desc';
  page: number;
  size: number;
  orderBy?: string;
  // orderBy?: {
  //   [K in keyof T]: 'asc' | 'desc';
  // };
}

export interface ApiParamsRequest {
  [key: string]: any;
  status?: any;
  page?: number;
  size?: number;
}
export interface ApiResponseList<T> {
  total: number;
  list: T;
  bnls?: T;
  ppls?: T;
}
