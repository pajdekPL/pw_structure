import { expect } from "@expects/api-expects";
import { test } from "@fixtures/api.fixture";

test.describe("?? @API", () => {
  test("??", async ({}) => {
    const expected = "Some actions";

    expect(expected).toBe(expected);
  });
});
