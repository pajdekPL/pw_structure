export const EnvVariables = {
  isEnvSet(envName: string): boolean {
    if (process.env[envName]) {
      return true;
    }
    return false;
  },

  requireEnv(envName: string): string | never {
    if (this.isEnvSet(envName)) {
      return process.env[envName];
    }
    throw new Error(`Required env variable ${envName} is not set!`);
  },
};
