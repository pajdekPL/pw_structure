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
import { test as base, APIRequestContext } from "@playwright/test";

interface UsersFixtures {
  roomsApiClient: RoomsApiClient;
  authApiClient: AuthApiClient;
  roomsAuthenticatedApiClient: RoomsApiClient;
}

export const test = base.extend<UsersFixtures>({
  roomsAuthenticatedApiClient: async ({ request }, use) => {
    const user = buildUserFromEnvVariables();
    const token = await loginUserAndGetToken(request, user);
    const cookies = `token=${token}`;
    const roomsApiClient = createRoomsApiClient(request, cookies, "");
    await use(roomsApiClient);
  },
  roomsApiClient: async ({ request }, use) => {
    const roomsApiClient = createRoomsApiClient(request);
    await use(roomsApiClient);
  },
  authApiClient: async ({ request }, use) => {
    const authApiClient = createAuthApiClient(request);
    await use(authApiClient);
  },
});

async function loginUserAndGetToken(
  request: APIRequestContext,
  user: AuthUserModel,
): Promise<string> {
  const authApiClient = createAuthApiClient(request);
  const token = await authApiClient.loginAndReturnToken(user);
  return token.replace(/^token=/, ""); // Remove 'token=' prefix if present
}
