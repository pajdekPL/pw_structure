export const EnvVariables = {
  isEnvSet(envName: string): boolean {
    if (process.env[envName]) {
      return true;
    }
    return false;
  },

  requireEnv(envName: string): string {
    if (this.isEnvSet(envName)) {
      return process.env[envName] as unknown as string;
    }
    throw new Error(`Required env variable ${envName} is not set!`);
  },
};
