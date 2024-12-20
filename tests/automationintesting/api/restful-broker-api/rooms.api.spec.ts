import { Room } from "@api/api-clients/restful-booker-platform/rooms-api-client";
import { API_STATUSES } from "@api/statuses.api";
import { expect } from "@expects/api-expects";
import { createDoubleRoomData } from "@factories/rooms.factory";
import { test } from "@fixtures/api.fixture";

test.describe("Restful broker /room api tests", { tag: "@API" }, () => {
  let roomId: number;

  test.beforeEach("Create a room", async ({ roomsAuthenticatedApiClient }) => {
    const data = await roomsAuthenticatedApiClient.createRoom(
      createDoubleRoomData(),
    );
    if (!data.roomid) {
      throw new Error("Room id is not defined");
    }
    roomId = data.roomid;
  });

  test("Unauthorized user can get all rooms", async ({ roomsApiClient }) => {
    const rooms = await roomsApiClient.getRooms();

    expect(rooms.rooms).toBeDefined();
    expect(rooms.rooms?.length).toBeGreaterThanOrEqual(1);
  });

  test("Unauthorized user can get the room details", async ({
    roomsApiClient,
  }) => {
    const roomData = await roomsApiClient.getRoom(roomId);

    expect(roomData.roomPrice).toBeDefined();
  });

  test("Unauthorized user can't delete a room", async ({ roomsApiClient }) => {
    await test.step("Unauthorized user tries to delete the room", async () => {
      const getRoomsResponse = await roomsApiClient.deleteRoomRaw(roomId);
      expect(getRoomsResponse).toHaveStatusCode(
        API_STATUSES.ACCESS_DENIED_403_STATUS,
      );
    });
  });

  test("Authorized user can get all rooms", async ({
    roomsAuthenticatedApiClient,
  }) => {
    const rooms = await roomsAuthenticatedApiClient.getRooms();

    expect(rooms.rooms).toBeDefined();
    expect(rooms.rooms?.length).toBeGreaterThanOrEqual(1);
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
        await roomsAuthenticatedApiClient.deleteRoom(roomId);
      });

      await test.step("Check that the deleted room doesn't exist", async () => {
        const getRoomResponse =
          await roomsAuthenticatedApiClient.getRoomRaw(roomId);

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

    const createRoomResponse =
      await roomsAuthenticatedApiClient.createRoomRaw(roomData);
    expect(createRoomResponse).toHaveStatusCode(
      API_STATUSES.CREATED_201_STATUS,
    );

    const data = createRoomResponse.data;
    expect(data).toMatchObject({ ...roomData });
  });
});
