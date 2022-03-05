import {
  ILoginAction,
  LoginActionKind,
  IReducer,
  ILoginState,
  IAction,
  IState,
} from "./Consts";

export const loginReducer: IReducer<ILoginState> = (
  state: ILoginState,
  action: ILoginAction
): ILoginState => {
  switch (action.type) {
    case LoginActionKind.LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case LoginActionKind.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case LoginActionKind.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        token: action.payload,
      };
    case LoginActionKind.LOGOUT:
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
};

export const combineReducers = (reducers: any) => {
  return (state: any, action: IAction) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        ...reducers[prop]({ [prop]: acc[prop] }, action),
      };
    }, state);
  };
};
