import { createContext, useEffect, useReducer } from "react";
import { useToken } from "../hooks/useToken";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  token: localStorage.getItem("token"),
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [token, setToken] = useToken();

  useEffect(() => {
   setToken(state.token);

    return () => {};
  }, [state.token, setToken]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
