import { turnOnAxiosDebugger } from "@utilities/axios-debuger";

export function createAxiosHttpApiClient<T>(
  baseUrl: string,
  httpClient: new (config: AxiosConfig) => T,
  token = "",
  cookies = "",
): T {
  turnOnAxiosDebugger();
  return new httpClient({
    baseURL: baseUrl,
    headers: {
      "X-api-version": "1.0",
      "content-type": "application/json;charset=UTF-8",
      Cookie: cookies,
      Authorization: `Bearer ${token}`,
    },
    validateStatus: () => true,
  });
}

interface AxiosConfig {
  baseURL: string;
  headers: object;
  validateStatus: (status: number) => boolean;
}
