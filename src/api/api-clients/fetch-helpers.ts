import { APIRequestContext } from "@playwright/test";

export interface FetchConfig {
  baseURL: string;
  headers: Record<string, string>;
  validateStatus?: (status: number) => boolean;
}

export interface FetchResponse<T = unknown> {
  status: number;
  statusText: string;
  data: T;
  headers: Record<string, string>;
}

export interface FetchOptions<T = unknown> {
  method?: string;
  headers?: Record<string, string>;
  data?: T;
  params?: Record<string, string | number | boolean | undefined>;
}

export async function fetchWithConfig<T>(
  request: APIRequestContext,
  url: string,
  options: FetchOptions<T> = {},
): Promise<FetchResponse<T>> {
  const { method = "GET", headers = {}, data, params } = options;

  // Build URL with query parameters
  const urlObj = new URL(url);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        urlObj.searchParams.append(key, String(value));
      }
    });
  }

  const response = await request.fetch(urlObj.toString(), {
    method,
    headers,
    data: data !== undefined ? JSON.stringify(data) : undefined,
  });

  const responseData = (await response.json().catch(() => null)) as T;
  const responseHeaders = response.headers();

  return {
    status: response.status(),
    statusText: response.statusText(),
    data: responseData,
    headers: responseHeaders,
  };
}
