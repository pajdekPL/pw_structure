import { Room } from "@api/api-clients/restful-booker-platform/rooms-generated-api-client";
import { faker } from "@faker-js/faker";

export function createDoubleRoomData(): Room {
  const room: Room = {
    roomName: faker.person.lastName(),
    type: "Double",
    roomPrice: 200,
    accessible: false,
    features: [],
  };
  return room;
}
