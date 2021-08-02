import type { AxiosError } from "axios";
import useSwr, {
  Key,
  KeyLoader,
  SWRConfiguration,
  SWRInfiniteConfiguration,
  SWRInfiniteResponse,
  SWRResponse,
  cache,
  mutate,
  useSWRInfinite,
} from "swr";

import { axiosInstance } from "@mtfh/common";

export type AxiosSWRError = AxiosError;
export type AxiosSWRResponse<T> = SWRResponse<T, AxiosSWRError>;
export type AxiosSWRInfiniteResponse<T> = SWRInfiniteResponse<T, AxiosSWRError>;
export type AxiosSWRConfiguration<T> = SWRConfiguration<T, AxiosError>;
export type AxiosSWRInfiniteConfiguration = SWRInfiniteConfiguration;

export const axiosFetcher = <ResponseData>(
  url: string
): Promise<ResponseData> =>
  axiosInstance.get<ResponseData>(url).then((res) => res.data);

export const useAxiosSWR = <ResponseData>(
  key: Key,
  options: SWRConfiguration<ResponseData, AxiosSWRError> = {}
): AxiosSWRResponse<ResponseData> =>
  useSwr<ResponseData, AxiosSWRError>(key, axiosFetcher, options);

export const useAxiosSWRInfinite = <ResponseData>(
  key: KeyLoader<ResponseData>,
  options: SWRInfiniteConfiguration<ResponseData, AxiosError> = {}
): AxiosSWRInfiniteResponse<ResponseData> =>
  useSWRInfinite<ResponseData, AxiosSWRError>(key, axiosFetcher, options);

export { cache, mutate };
