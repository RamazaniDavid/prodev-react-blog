import axios from "axios";

export function jwtInterceptor() {
  axios.interceptors.request.use((request: any) => {
    // add auth header with jwt if account is logged in and request is to the api url
    const token = localStorage.getItem("token");

    if (token) {
      request.headers.common.Authorization = `Bearer ${token}`;
    }

    return request;
  });
}
