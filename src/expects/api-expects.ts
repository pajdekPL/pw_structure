import { expect as baseExpect } from "@playwright/test";
import { AxiosResponse } from "axios";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
  toHaveStatusCode(
    response: AxiosResponse,
    status: number,
  ): { pass: boolean; message: () => string } {
    let pass: boolean;
    let matcherResult: string;
    try {
      baseExpect(response.status).toBe(status);
      pass = true;
      matcherResult = "Passed";
    } catch (error) {
      matcherResult = `${String(error)}, statusText: ${JSON.stringify(
        response.statusText,
      )}  method: ${response.config.method}
      full_response: ${JSON.stringify(response.data)} url: ${
        response.config.url
      } data: ${response.config.data} headers: ${JSON.stringify(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        response.request._header,
      )}`;
      pass = false;
    }
    return {
      message: () => matcherResult,
      pass: pass,
    };
  },
});
