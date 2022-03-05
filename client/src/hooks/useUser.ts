import { useContext, useEffect, useState } from "react";
import AppCtx from "../store/Context";

export const useUser = () => {
  // const [token] = useToken();
  const {
    state: {
      login: { token },
    },
  } = useContext(AppCtx);

  const getPayload = (token: string) => {
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
