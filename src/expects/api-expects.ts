/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { expect as baseExpect } from "@playwright/test";
import { AxiosResponse } from "axios";

export { test } from "@playwright/test";

export const expect = baseExpect.extend({
  toHaveStatusCode(response: AxiosResponse, status: number) {
    let pass: boolean;
    let matcherResult: string;

    try {
      baseExpect(response.status).toBe(status);
      (pass = true), (matcherResult = "Passed");
    } catch (error) {
      matcherResult = `${error}, statusText: ${JSON.stringify(
        response.statusText,
      )}  method: ${response.config.method}
      full_response: ${JSON.stringify(response.data)} url: ${
        response.config.url
      } data: ${response.config.data} headers: ${JSON.stringify(
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
