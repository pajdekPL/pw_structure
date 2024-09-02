export function turnOnAxiosDebugger(): void {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("axios-debug-log")({
    request: function (debug, config) {
      debug(
        `method: ${config.method} request to: ${config.url}`,
        `\nparams: ${JSON.stringify(config.params)}`,
        `\ndata: ${JSON.stringify(config.data)}`,
        `\nheaders: ${JSON.stringify(config.headers)}`,
      );
    },
    response: function (debug, response) {
      debug(
        `response with data: ${JSON.stringify(response.data)}`,
        `\nfrom: ${response.config.url}`,
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
