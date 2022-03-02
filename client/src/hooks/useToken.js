import { useEffect, useState } from "react";

export const useToken = () => {
  const [token, setInternalToken] = useState(() => {
    const token = localStorage.getItem("token") || null;
    return token;
  });

  const setToken = (token) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    setInternalToken(token);
  };

  return [token, setToken];
};
