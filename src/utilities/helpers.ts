export function sleep(sleepTimeMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, sleepTimeMs));
}

export function omit<T extends object, K extends keyof T>(
  key: K,
  obj: T,
): Omit<T, K> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: _, ...rest } = obj;
  return rest;
}

export interface ResponseHeaders {
  "set-cookie"?: string | string[];
  [key: string]: string | string[] | undefined;
}

export function extractTokenFromResponseHeaders(
  headers: ResponseHeaders,
): string {
  const token = headers["set-cookie"];
  if (!token) {
    throw new Error(
      `Token not found in response headers: ${JSON.stringify(headers)}`,
    );
  }
  return typeof token === "string" ? token : token[0];
}
