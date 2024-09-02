import { API_STATUSES } from "@api/statuses.api";
import { expect } from "@expects/api-expects";
import { buildUserFromEnvVariables } from "@factories/auth-user.factory";
import { test } from "@fixtures/api.fixture";
import { extractTokenFromResponseHeaders } from "@utilities/helpers";

test.describe("Restful broker /login api tests @API", () => {
  test("Nonexisting user can't get access token", async ({ authApiClient }) => {
    const nonExistingUser = {
      username: "fakeUser",
      password: "fakePassword",
    };

    const response = await authApiClient.login(nonExistingUser);

    expect(response).toHaveStatusCode(API_STATUSES.ACCESS_DENIED_403_STATUS);
  });

  test("Existing user can get access token", async ({ authApiClient }) => {
    const existingUser = buildUserFromEnvVariables();

    const response = await authApiClient.login(existingUser);

    expect(response).toHaveStatusCode(API_STATUSES.SUCCESSFUL_200_STATUS);
    expect(extractTokenFromResponseHeaders(response.headers)).toBeTruthy();
  });
});
