import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from "./Actions";

const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
};
