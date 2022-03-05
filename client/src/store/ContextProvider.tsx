import { useEffect, useReducer } from "react";
import AppCtx, { INITIAL_STATE } from "./Context";
import { combineReducers, loginReducer } from "./Reducers";

const appReducers = combineReducers({
  login: loginReducer,
});

export const AppCtxProvider = ({ children }: { children: any }) => {
  
  const [state, dispatch] = useReducer(appReducers, INITIAL_STATE);

  useEffect(() => {
    if (state?.login?.token) localStorage.setItem("token", state.login.token);
    else localStorage.removeItem("token");

    return () => {};
  }, [state.login.token]);

  return (
    <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>
  );
};