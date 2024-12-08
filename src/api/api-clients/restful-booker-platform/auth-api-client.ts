import { BaseApiClient } from "@api/api-clients/base-api-client";
import { FetchConfig, FetchResponse } from "@api/api-clients/fetch-helpers";
import type { components } from "@api/api-clients/restful-booker-platform/auth";
import { API_STATUSES } from "@api/statuses.api";
import { expect } from "@expects/api-expects";
import { APIRequestContext } from "@playwright/test";
import { BASE_API_URL } from "playwright.config";

export const AUTH_API_URL = new URL("/auth/", BASE_API_URL).toString();

export type Auth = components["schemas"]["Auth"];
export type Token = components["schemas"]["Token"];

export class AuthApiClient extends BaseApiClient {
  constructor(config: FetchConfig, request: APIRequestContext) {
    super(config, request, "/auth/");
  }

  async loginRaw(data: Auth): Promise<FetchResponse<Auth>> {
    return this.makeRequest<Auth>(`${this.basePath}login`, {
      method: "POST",
      data,
    });
  }

  async login(data: Auth): Promise<FetchResponse> {
    const response = await this.loginRaw(data);
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response;
  }

  async loginAndReturnToken(data: Auth): Promise<string> {
    const response = await this.login(data);
    const setCookie = response.headers["set-cookie"];

    if (!setCookie) {
      throw new Error("Token not found in response headers");
    }

    const cookieValue =
      typeof setCookie === "string" ? setCookie : setCookie[0];
    const tokenMatch = /token=([^;]+)/.exec(cookieValue);
    if (!tokenMatch) {
      throw new Error("Token format not recognized in cookie");
    }

    return tokenMatch[1];
  }

  async validateToken(token: string): Promise<FetchResponse<Token>> {
    const response = await this.makeRequest<Token>(`${this.basePath}validate`, {
      method: "POST",
      data: { token },
    });

    if (!response.data?.token) {
      throw new Error("Invalid token response from server");
    }

    return response;
  }

  async clearToken(token: string): Promise<FetchResponse<Token>> {
    return this.makeRequest<Token>(`${this.basePath}logout`, {
      method: "POST",
      data: { token },
    });
  }
}

export function createAuthApiClient(
  request: APIRequestContext,
  token = "",
  cookies = "",
): AuthApiClient {
  const config: FetchConfig = {
    baseURL: BASE_API_URL,
    headers: {
      "X-api-version": "1.0",
      "content-type": "application/json;charset=UTF-8",
      Cookie: cookies ? `token=${cookies}` : "",
      Authorization: token ? `Bearer ${token}` : "",
    },
    validateStatus: () => true,
  };

  return new AuthApiClient(config, request);
}
