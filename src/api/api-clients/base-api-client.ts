import { APIRequestContext } from "@playwright/test";
import {
  FetchConfig,
  FetchOptions,
  FetchResponse,
  fetchWithConfig,
} from "./fetch-helpers";

export type RequestParams<TData = unknown> = Omit<FetchOptions<TData>, "data"> & {
  data?: TData;
};

export class BaseApiClient {
  protected request: APIRequestContext;
  protected config: FetchConfig;
  protected basePath: string;

  constructor(
    config: FetchConfig,
    request: APIRequestContext,
    basePath: string,
  ) {
    this.config = config;
    this.request = request;
    this.basePath = basePath;
  }

  protected async makeRequest<T, D extends T = T>(
    endpoint: string,
    options: RequestParams<D> = {},
  ): Promise<FetchResponse<T>> {
    const url = new URL(endpoint, this.config.baseURL).toString();
    return fetchWithConfig<T>(this.request, url, {
      ...options,
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
    });
  }
}
