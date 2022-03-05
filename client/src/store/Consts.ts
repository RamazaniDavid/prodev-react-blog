export enum LoginActionKind {
  LOGIN_START = "LOGIN_START",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT = "LOGOUT",
}

export interface IAction {
  type: any;
  payload?: any;
}

export interface IReducer<T> {
  (state: T, action: IAction): T;
}

export interface ILoginAction extends IAction {
  type: LoginActionKind;
  payload?: any;
}

export interface ILoginState {
  token: string | null;
  isFetching: boolean;
  error: any;
}

export interface IState {
  login: ILoginState;
}
