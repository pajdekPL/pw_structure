import { AuthUserModel } from "@models/auth-user.model";
import { EnvVariables } from "@utilities/env-variables";

export function buildUserFromEnvVariables(): AuthUserModel {
  return {
    username: EnvVariables.requireEnv("USERNAME"),
    password: EnvVariables.requireEnv("PASSWORD"),
  };
}
