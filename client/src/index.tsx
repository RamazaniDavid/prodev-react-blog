import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { errorInterceptor } from "./helpers/error.interceptor";
import { jwtInterceptor } from "./helpers/jwt.interceptor";
import "./index.scss";
import { AppCtxProvider } from "./store/ContextProvider";

jwtInterceptor();
errorInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <AppCtxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppCtxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
