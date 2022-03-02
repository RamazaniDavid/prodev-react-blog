import { useContext, useEffect, useState } from "react";
import { Context } from "../store/Context";

export const useUser = () => {
  // const [token] = useToken();
  const {state:{token}} =useContext(Context)

  const getPayload = (token) => {
    const base64Url = token.split(".")[1];
    return JSON.parse(atob(base64Url));
  };

  const [user, setUser] = useState(() => {
    if (!token) {
      return null;
    }
    return getPayload(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      const payload = getPayload(token);
      setUser(payload);
    }

    return () => {};
  }, [token]);

  return user;
};
