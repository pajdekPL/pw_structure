import { expect as baseExpect } from "@playwright/test";
import { FetchResponse } from "@api/api-clients/fetch-helpers";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
  toHaveStatusCode(
    response: FetchResponse,
    status: number,
  ): { pass: boolean; message: () => string } {
    let pass: boolean;
    let matcherResult: string;
    try {
      baseExpect(response.status).toBe(status);
      pass = true;
      matcherResult = "Passed";
    } catch (error) {
      matcherResult = `${String(error)}, statusText: ${
        response.statusText
      } response data: ${JSON.stringify(response.data)} headers: ${JSON.stringify(
        response.headers,
      )}`;
      pass = false;
    }
    return {
      message: () => matcherResult,
      pass: pass,
    };
  },
});
