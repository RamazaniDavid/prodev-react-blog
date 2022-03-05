import { useContext } from "react";
import AppCtx from "../store/Context";

const useDispatch = () => {
  const { dispatch } = useContext(AppCtx);
  if (!dispatch) {
    throw new Error("useDispatch must be used within a Provider");
  }
  return dispatch;
};

export default useDispatch;
