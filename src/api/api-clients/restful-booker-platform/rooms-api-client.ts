import { createAxiosHttpApiClient } from "@api/api-clients/api-helpers";
import {
  HttpClient,
  RoomsGeneratedApiClient,
} from "@api/api-clients/restful-booker-platform/rooms-generated-api-client";
import { AxiosResponse } from "axios";
import { BASE_API_URL } from "playwright.config";

export const ROOMS_API_URL = BASE_API_URL;

export class RoomsApiClient {
  apiClient: RoomsGeneratedApiClient<unknown>;

  constructor(private httpClient: HttpClient) {
    this.apiClient = new RoomsGeneratedApiClient(this.httpClient);
  }

  async getRooms(params?: object): Promise<AxiosResponse> {
    const response = await this.apiClient.getRooms(params);
    return response;
  }
}

export function createRoomsApiClient(token = "", cookies = ""): RoomsApiClient {
  const httpClient = createAxiosHttpApiClient(
    ROOMS_API_URL,
    HttpClient,
    token,
    cookies,
  );
  return new RoomsApiClient(httpClient);
}
