import { useContext } from "react";
import { Context } from "../store/Context";

const useDispatch = () => {
  const { dispatch } = useContext(Context);
  if (!dispatch) {
    throw new Error("useDispatch must be used within a Provider");
  }
  return dispatch;
};

export default useDispatch;
