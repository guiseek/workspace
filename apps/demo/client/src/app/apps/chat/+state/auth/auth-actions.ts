import { AuthCredential, AuthPayload, AuthTypes } from '@nx-feat/chat-data';

class AuthInit {
  type = AuthTypes.Init;
  payload = null;
}

class AuthLogin {
  type = AuthTypes.Login;

  constructor(public payload: AuthCredential) {}
}

class AuthResponse {
  type = AuthTypes.Response;

  constructor(public payload: AuthPayload) {}
}

export type AuthAction = AuthInit | AuthLogin | AuthResponse;
export { AuthInit, AuthLogin, AuthResponse };
