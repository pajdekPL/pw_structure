import { createAxiosHttpApiClient } from "@api/api-clients/api-helpers";
import {
  HttpClient,
  Room,
  Rooms,
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

  async getRooms(
    check = true,
    params?: object,
  ): Promise<AxiosResponse | Rooms> {
    const response = await this.apiClient.getRooms(params);
    if (!check) {
      return response;
    }

    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);

    return response.data as unknown as Rooms;
  }

  async getRoom(
    room_id: number,
    check = true,
    params?: object,
  ): Promise<AxiosResponse | Room> {
    const response = await this.apiClient.id.getRoom(room_id, params);
    if (!check) {
      return response;
    }
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);

    const data = response.data as unknown as Room;
    return data;
  }

  async deleteRoom(
    room_id: number,
    check = true,
    params?: object,
  ): Promise<AxiosResponse | void> {
    const response = await this.apiClient.id.deleteRoom(room_id, params);
    if (!check) {
      return response;
    }
    expect(response).toHaveStatusCode(API_STATUSES.ACCEPTED_202_STATUS);
  }

  async createRoom(
    data: Room,
    check = true,
    params?: object,
  ): Promise<AxiosResponse | Room> {
    const response = await this.apiClient.createRoom(data, params);
    if (!check) {
      return response;
    }

    expect(response).toHaveStatusCode(API_STATUSES.CREATED_201_STATUS);
    const roomDetails: Room = response.data;
    return roomDetails;
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
