import { AuthenticationQuery } from "./authentication.query";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationStore } from "./authentication.store";

export const authenticationProviders = [
  AuthenticationQuery,
  AuthenticationService,
  AuthenticationStore,
];