import { BaseApiClient } from "@api/api-clients/base-api-client";
import { FetchConfig, FetchResponse } from "@api/api-clients/fetch-helpers";
import type { components } from "@api/api-clients/restful-booker-platform/room";
import { API_STATUSES } from "@api/statuses.api";
import { expect } from "@expects/api-expects";
import { APIRequestContext } from "@playwright/test";
import { BASE_API_URL } from "playwright.config";

export type Room = components["schemas"]["Room"];
export type Rooms = components["schemas"]["Rooms"];

interface RoomQueryParams {
  roomName?: string;
  type?: string;
  accessible?: boolean;
  [key: string]: string | boolean | undefined;
}

export const ROOMS_API_URL = new URL("/room/", BASE_API_URL).toString();

export class RoomsApiClient extends BaseApiClient {
  constructor(config: FetchConfig, request: APIRequestContext) {
    super(config, request, "/room/");
  }

  async getRoomsRaw(params?: RoomQueryParams): Promise<FetchResponse<Rooms>> {
    return this.makeRequest<Rooms, never>(this.basePath, {
      method: "GET",
      params,
    });
  }

  async getRooms(params?: RoomQueryParams): Promise<Rooms> {
    const response = await this.getRoomsRaw(params);
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response.data;
  }

  async getRoomRaw(id: number): Promise<FetchResponse<Room>> {
    return this.makeRequest<Room, never>(`${this.basePath}${id}`, {
      method: "GET",
    });
  }

  async getRoom(id: number): Promise<Room> {
    const response = await this.getRoomRaw(id);
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response.data;
  }

  async createRoomRaw(data: Room): Promise<FetchResponse<Room>> {
    return this.makeRequest<Room, Room>(this.basePath, {
      method: "POST",
      data,
    });
  }

  async createRoom(data: Room): Promise<Room> {
    const response = await this.createRoomRaw(data);
    expect(response).toHaveStatusCode(API_STATUSES.CREATED_201_STATUS);
    return response.data;
  }

  async updateRoomRaw(id: number, data: Room): Promise<FetchResponse<Room>> {
    return this.makeRequest<Room, Room>(
      new URL(`${id}`, this.basePath).toString(),
      {
        method: "PUT",
        data,
      },
    );
  }

  async updateRoom(id: number, data: Room): Promise<Room> {
    const response = await this.updateRoomRaw(id, data);
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    return response.data;
  }

  async deleteRoomRaw(id: number): Promise<FetchResponse<null>> {
    return this.makeRequest<null, never>(`${this.basePath}${id}`, {
      method: "DELETE",
    });
  }

  async deleteRoom(id: number): Promise<void> {
    const response = await this.deleteRoomRaw(id);
    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
  }
}

export function createRoomsApiClient(
  request: APIRequestContext,
  cookies = "",
  token = "",
): RoomsApiClient {
  const config: FetchConfig = {
    baseURL: BASE_API_URL,
    headers: {
      "X-api-version": "1.0",
      "content-type": "application/json;charset=UTF-8",
      Cookie: cookies,
      Authorization: token ? `Bearer ${token}` : "",
    },
    validateStatus: () => true,
  };

  return new RoomsApiClient(config, request);
}
