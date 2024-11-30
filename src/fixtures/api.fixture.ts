import {
  AuthApiClient,
  createAuthApiClient,
} from "@api/api-clients/restful-booker-platform/auth-api-client";
import {
  RoomsApiClient,
  createRoomsApiClient,
} from "@api/api-clients/restful-booker-platform/rooms-api-client";
import { buildUserFromEnvVariables } from "@factories/auth-user.factory";
import { AuthUserModel } from "@models/auth-user.model";
import { test as base } from "@playwright/test";

interface UsersFixtures {
  roomsApiClient: RoomsApiClient;
  authApiClient: AuthApiClient;
  roomsAuthenticatedApiClient: RoomsApiClient;
}

export const test = base.extend<UsersFixtures>({
  roomsAuthenticatedApiClient: async ({}, use) => {
    const user = buildUserFromEnvVariables();
    const token = await loginUserAndGetToken(user);
    const roomsApiClient = createRoomsApiClient("", `token=${token}`);
    await use(roomsApiClient);
  },
  roomsApiClient: async ({}, use) => {
    const roomsApiClient = createRoomsApiClient();
    await use(roomsApiClient);
  },
  authApiClient: async ({}, use) => {
    const authApiClient = createAuthApiClient();
    await use(authApiClient);
  },
});

async function loginUserAndGetToken(user: AuthUserModel): Promise<string> {
  const authApiClient = createAuthApiClient();
  return authApiClient.loginAndReturnToken(user);
}
