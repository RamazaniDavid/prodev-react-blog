import { ILoginAction, LoginActionKind } from "./Consts";

export const LoginStart = (): ILoginAction => ({
  type: LoginActionKind.LOGIN_START,
  payload: null,
});

export const LoginSuccess = (token: string): ILoginAction => ({
  type: LoginActionKind.LOGIN_SUCCESS,
  payload: token,
});

export const LoginFailure = (
  error: any
): ILoginAction => ({
  type: LoginActionKind.LOGIN_FAILURE,
  payload: error,
});

export const Logout = (): ILoginAction => ({
  type: LoginActionKind.LOGOUT,
  payload: null,
});
