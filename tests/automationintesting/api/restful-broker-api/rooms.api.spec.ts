import { Room } from "@api/api-clients/restful-booker-platform/rooms-generated-api-client";
import { API_STATUSES } from "@api/statuses.api";
import { expect } from "@expects/api-expects";
import { createDoubleRoomData } from "@factories/rooms.factory";
import { test } from "@fixtures/api.fixture";
import { omit } from "@utilities/helpers";

test.describe("Restful broker /room api tests @API", () => {
  let roomId: number;
  test.beforeEach("Create a room", async ({ roomsAuthenticatedApiClient }) => {
    roomId = await roomsAuthenticatedApiClient.createRoomAndVerify(
      createDoubleRoomData(),
    );
  });
  test("Unauthorized user can get all rooms", async ({ roomsApiClient }) => {
    const getRoomsResponse = await roomsApiClient.getRooms();

    expect(getRoomsResponse).toHaveStatusCode(
      API_STATUSES.SUCCESSFUL_200_STATUS,
    );
    expect(getRoomsResponse.data.rooms.length).toBeGreaterThanOrEqual(1);
  });

  test("Unauthorized user can get the room details", async ({
    roomsApiClient,
  }) => {
    const getRoomResponse = await roomsApiClient.getRoom(roomId);

    expect(getRoomResponse).toHaveStatusCode(
      API_STATUSES.SUCCESSFUL_200_STATUS,
    );
    expect(getRoomResponse.data.roomPrice).toBeDefined();
  });

  test("Unauthorized user can't delete  a room", async ({ roomsApiClient }) => {
    await test.step("Unauthorized user tries to delete the room", async () => {
      const getRoomsResponse = await roomsApiClient.deleteRoom(roomId);

      expect(getRoomsResponse).toHaveStatusCode(
        API_STATUSES.ACCESS_DENIED_403_STATUS,
      );
    });
  });

  test("Authorized user can get all rooms", async ({
    roomsAuthenticatedApiClient,
  }) => {
    const getRoomsResponse = await roomsAuthenticatedApiClient.getRooms();

    expect(getRoomsResponse).toHaveStatusCode(
      API_STATUSES.SUCCESSFUL_200_STATUS,
    );
    expect(getRoomsResponse.data.rooms.length).toBeGreaterThanOrEqual(1);
  });

  test(
    "Authorized user can delete existing room",
    {
      annotation: {
        type: "reported bug",
        description: "server returns 500 for non existed rooms - LINK",
      },
    },
    async ({ roomsAuthenticatedApiClient }) => {
      await test.step("Delete room", async () => {
        const deleteRoomResponse = await roomsAuthenticatedApiClient.deleteRoom(
          roomId,
        );

        expect(deleteRoomResponse).toHaveStatusCode(
          API_STATUSES.ACCEPTED_202_STATUS,
        );
      });

      await test.step("Check that the deleted room doesn't exist", async () => {
        const getRoomResponse = await roomsAuthenticatedApiClient.getRoom(
          roomId,
        );

        expect(getRoomResponse).toHaveStatusCode(
          API_STATUSES.NOT_FOUND_404_STATUS,
        );
      });
    },
  );

  test("Authorized user can create room", async ({
    roomsAuthenticatedApiClient,
  }) => {
    const roomData: Room = createDoubleRoomData();
    const createRoomResponse = await roomsAuthenticatedApiClient.createRoom(
      roomData,
    );

    expect(createRoomResponse).toHaveStatusCode(
      API_STATUSES.CREATED_201_STATUS,
    );
    expect(omit("roomid", createRoomResponse.data)).toStrictEqual(roomData);
  });
});
