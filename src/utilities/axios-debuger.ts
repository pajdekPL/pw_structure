export function turnOnAxiosDebugger(): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("axios-debug-log")({
    request: function (debug, config) {
      const url = new URL(config.url, config.baseURL).toString();
      debug(
        `request to: ${url} method: ${config.method}`,
        `\nparams: ${JSON.stringify(config.params)}`,
        `\ndata: ${JSON.stringify(config.data)}`,
        `\nheaders: ${JSON.stringify(config.headers)}`,
      );
    },
    response: function (debug, response) {
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
    error: function (debug, error) {
      // Read https://www.npmjs.com/package/axios#handling-errors for more info
      debug("Error", error);
    },
  });
}
