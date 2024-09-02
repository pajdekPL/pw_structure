import { createAxiosHttpApiClient } from "@api/api-clients/api-helpers";
import {
  Auth,
  AuthGeneratedApiClient,
  HttpClient,
} from "@api/api-clients/restful-booker-platform/auth-generated-api-client";
import { API_STATUSES } from "@api/statuses.api";
import { expect } from "@expects/api-expects";
import { extractTokenFromResponseHeaders } from "@utilities/helpers";
import { AxiosResponse } from "axios";
import { BASE_API_URL } from "playwright.config";

export const ROOMS_API_URL = new URL("/auth/", BASE_API_URL).toString();

export class AuthApiClient {
  apiClient: AuthGeneratedApiClient<unknown>;

  constructor(private httpClient: HttpClient) {
    this.apiClient = new AuthGeneratedApiClient(this.httpClient);
  }

  async login(data: Auth): Promise<AxiosResponse> {
    const response = await this.apiClient.login.createToken(data);
    return response;
  }

  async loginAndReturnToken(data: Auth): Promise<string> {
    const response = await this.login(data);

    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);

    return extractTokenFromResponseHeaders(response.headers);
  }
}

export function createAuthApiClient(token = "", cookies = ""): AuthApiClient {
  const httpClient = createAxiosHttpApiClient(
    ROOMS_API_URL,
    HttpClient,
    token,
    cookies,
  );
  return new AuthApiClient(httpClient);
}
