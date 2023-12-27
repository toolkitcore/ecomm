import { AuthenticationGuard } from "./authentication.guard";
import { RoleGuard } from "./role.guard";

export const guardProviders = [
  RoleGuard,
  AuthenticationGuard
];