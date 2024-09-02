import { API_STATUSES } from "@api/statuses.api";
import { expect } from "@expects/api-expects";
import { test } from "@fixtures/api.fixture";

test.describe("Restful broker /login api tests @API", () => {
  test("Unauthorized user can get all rooms", async ({ roomsApiClient }) => {
    const getRoomsResponse = await roomsApiClient.getRooms();

    expect(getRoomsResponse).toHaveStatusCode(
      API_STATUSES.SUCCESSFUL_200_STATUS,
    );
  });

  test("Authorized user can get all rooms", async ({
    roomsAuthenticatedApiClient,
  }) => {
    const getRoomsResponse = await roomsAuthenticatedApiClient.getRooms();

    expect(getRoomsResponse).toHaveStatusCode(
      API_STATUSES.SUCCESSFUL_200_STATUS,
    );
  });
});
