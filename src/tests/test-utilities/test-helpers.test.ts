import {
  extractTokenFromResponseHeaders,
  ResponseHeaders,
} from "@utilities/helpers";
import { describe, expect, it } from "vitest";

describe("Test Helpers", () => {
  describe("extractTokenFromResponseHeaders", () => {
    it("should extract token from string header", () => {
      const fakeToken = "abc123";
      const headers: ResponseHeaders = {
        "set-cookie": fakeToken,
      };

      expect(extractTokenFromResponseHeaders(headers)).toBe(fakeToken);
    });

    it("should extract token from array header", () => {
      const fakeToken = "abc123";
      const headers: ResponseHeaders = {
        "set-cookie": [fakeToken],
      };

      expect(extractTokenFromResponseHeaders(headers)).toBe(fakeToken);
    });

    it("should throw error when token is not found", () => {
      const headers: ResponseHeaders = {};
      expect(() => extractTokenFromResponseHeaders(headers)).toThrow(
        "Token not found in response headers",
      );
    });
  });
});
