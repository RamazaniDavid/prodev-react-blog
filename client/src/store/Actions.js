export const LOGIN_START = "LOGIN_START";
export const LoginStart = () => ({
  type: LOGIN_START,
});

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LoginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const LOGIN_FAIL = "LOGIN_FAIL";
export const LoginFail = (error) => ({
  type: LOGIN_FAIL,
  payload: error,
});

export const LOGOUT = "LOGOUT";
export const Logout = () => ({
  type: LOGOUT,
});
