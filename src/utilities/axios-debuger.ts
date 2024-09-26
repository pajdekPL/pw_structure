/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axiosDebugLog from "axios-debug-log";
export function turnOnAxiosDebugger(): void {
  axiosDebugLog({
    request: function (debug: any, config: any) {
      const url = new URL(config.url, config.baseURL).toString();
      debug(
        `request to: ${url} method: ${config.method}`,
        `\nparams: ${JSON.stringify(config.params)}`,
        `\ndata: ${JSON.stringify(config.data)}`,
        `\nheaders: ${JSON.stringify(config.headers)}`,
      );
    },
    response: function (debug: any, response: any) {
      const url = new URL(
        response.config.url,
        response.config.baseURL,
      ).toString();
      debug(
        `response from: ${url}`,
        `\nwith data: ${JSON.stringify(response.data)}`,
        `\nstatus code: ${response.status}`,
        `\nresponse headers: { ${response.headers} }`,
      );
    },
    error: function (debug: any, error: any) {
      // Read https://www.npmjs.com/package/axios#handling-errors for more info
      debug("Error", error);
    },
  });
}
