import React, { createContext } from "react";
import { IAction, IState } from "./Consts";

export const INITIAL_STATE: IState = {
  login: {
    token: localStorage.getItem("token"),
    isFetching: false,
    error: false,
  },
};

const AppCtx = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

export default AppCtx;
