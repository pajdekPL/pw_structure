import { extractTokenFromResponseHeaders, omit } from "@utilities/helpers";
import { RawAxiosResponseHeaders } from "axios";
import { describe, expect, test } from "vitest";

describe("Test helpers", () => {
  test("omit should remove given key from the object", () => {
    const inputObject = {
      id: "SomeId",
      uuid: "AutomaticallyGeneratedUUID",
    };
    const expected = {
      id: "SomeId",
    };
    const sut = omit("uuid", inputObject);

    expect(sut).toStrictEqual(expected);
  });

  test("extractTokenFromResponseHeaders returns properly extracted token", () => {
    const fakeToken = "CkV1VNd3jBgyyr2x";
    const axiosJsonHeaders: RawAxiosResponseHeaders = {
      date: "Mon, 02 Sep 2024 12:55:32 GMT",
      "content-length": "0",
      connection: "keep-alive",
      "set-cookie": [`token=${fakeToken}; Path=/`],
      "cf-cache-status": "DYNAMIC",
      "report-to":
        '{"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report\\/v4?s=stvxhwvCMKxZ3eAbx0%2FpnTa%2FMxjH9Fi9pn9otF0%2FLJFWPy1TOBNUb2i8aBqlUIp2hWkoyjZVeFSEl4ZN1C8RcPPhlHTparrKakYfrkb%2BlPD4oRq86PqopgDpK4lYdyN5xdUWYv611zvNRisopY9k2hmAGRuuIb%2FLCA%3D%3D"}],"group":"cf-nel","max_age":604800}',
      nel: '{"success_fraction":0,"report_to":"cf-nel","max_age":604800}',
      server: "cloudflare",
      "cf-ray": "8bcda7ae4faad29e-FRA",
      "alt-svc": 'h3=":443"; ma=86400',
    };

    expect(extractTokenFromResponseHeaders(axiosJsonHeaders)).toBe(fakeToken);
  });

  test("extractTokenFromResponseHeaders throws error when improper headers are given", () => {
    const axiosJsonHeaders: RawAxiosResponseHeaders = {};
    expect(() => extractTokenFromResponseHeaders(axiosJsonHeaders)).toThrow(
      /It was not possible to parse token from the given response headers: {}/,
    );
  });
});
