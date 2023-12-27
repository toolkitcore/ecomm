export interface Authentication extends AuthenticationUser {
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticationUser {
  id: string;
  lastName: string;
  firstName: string;
  role: string;
  isAuthenticate: boolean;
  username: string;
}

export interface RefreshToken {
  accessToken: string;
}

export interface JwtModel {
  exp: number;
  nameid: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  unique_name: string;
  nbf: number;
  iat: number;
}
export function createAuthentication() {
  return {

  } as Authentication;
}
