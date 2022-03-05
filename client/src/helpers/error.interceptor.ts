import axios from "axios";

export function errorInterceptor() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { response } = error;
      if (!response) {
        // network error
        console.error(error);
        return;
      }

      const token = localStorage.getItem("token");
      if ([401, 403].includes(response.status) && token) {
        // auto logout if 401 or 403 response returned from api
        //logout();
      }

      const errorMessage = response.data?.message || response.statusText;
      console.error("ERROR:", errorMessage);
    }
  );
}
