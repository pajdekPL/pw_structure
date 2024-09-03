import { createAxiosHttpApiClient } from "@api/api-clients/api-helpers";
import {
  HttpClient,
  Room,
  RoomsGeneratedApiClient,
} from "@api/api-clients/restful-booker-platform/rooms-generated-api-client";
import { API_STATUSES } from "@api/statuses.api";
import { expect } from "@expects/api-expects";
import { AxiosResponse } from "axios";
import { BASE_API_URL } from "playwright.config";

export const ROOMS_API_URL = new URL("/room/", BASE_API_URL).toString();

export class RoomsApiClient {
  apiClient: RoomsGeneratedApiClient<unknown>;

  constructor(private httpClient: HttpClient) {
    this.apiClient = new RoomsGeneratedApiClient(this.httpClient);
  }

  async getRooms(params?: object): Promise<AxiosResponse> {
    const response = await this.apiClient.getRooms(params);
    return response;
  }

  async getRoom(room_id: number, params?: object): Promise<AxiosResponse> {
    const response = await this.apiClient.id.getRoom(room_id, params);
    return response;
  }

  async deleteRoom(room_id: number, params?: object): Promise<AxiosResponse> {
    const response = await this.apiClient.id.deleteRoom(room_id, params);
    return response;
  }

  async createRoom(data: Room, params?: object): Promise<AxiosResponse> {
    const response = await this.apiClient.createRoom(data, params);
    return response;
  }

  async createRoomAndVerify(data: Room, params?: object): Promise<number> {
    const response = await this.createRoom(data, params);

    expect(response).toHaveStatusCode(API_STATUSES.CREATED_201_STATUS);

    const roomDetails: Room = response.data;
    return roomDetails.roomid;
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
