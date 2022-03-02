import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { errorInterceptor } from "./helpers/error.interceptor";
import { jwtInterceptor } from "./helpers/jwt.interceptor";
import "./index.scss";
import { ContextProvider } from "./store/Context";

jwtInterceptor();
errorInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
