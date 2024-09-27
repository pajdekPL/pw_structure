import { RawAxiosResponseHeaders } from "axios";

export function sleep(sleepTimeMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, sleepTimeMs));
}

export function omit(key: string, obj: object): object {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: _, ...rest } = obj;
  return rest;
}

export function extractTokenFromResponseHeaders(
  headers: RawAxiosResponseHeaders,
): string {
  let token = "";
  try {
    let tokenString = "";
    if (headers["set-cookie"]?.[0]) {
      tokenString = headers["set-cookie"][0].split(";")[0];
    } else {
      throw new TypeError(
        `It was not possible to parse token from the given response headers: ${JSON.stringify(
          headers,
        )}`,
      );
    }
    tokenString = tokenString.split(";")[0];
    token = tokenString.slice(tokenString.indexOf("=") + 1);
  } catch (error) {
    throw new TypeError(
      `It was not possible to parse token from the given response headers: ${JSON.stringify(
        headers,
      )}, error: ${String(error)}`,
    );
  }
  if (!token) {
    throw new TypeError(
      `It was not possible to parse token from the given response headers: ${JSON.stringify(
        headers,
      )}`,
    );
  }
  return token;
}
