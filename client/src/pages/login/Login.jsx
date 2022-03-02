import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import loginSchema from "./login.schema";
import "./Login.scss";
import { Context } from "../../store/Context";
import { LoginFail, LoginStart, LoginSuccess } from "../../store/Actions";
import { FormInputErrors } from "../../shared/formInputErrors";

const Login = () => {
  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: yupResolver(loginSchema),
    criteriaMode: "all",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: 2000,
  });

  const { state, dispatch } = React.useContext(Context);

  useEffect(() => {
   

    return () => {};
  }, [state]);

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form
        className="loginForm"
        onSubmit={form.handleSubmit(async (d) => {
          dispatch(LoginStart(d));
          try {
            const res = await axios.post("/api/Auth/login", d);
            dispatch(LoginSuccess(res.data.model.token));
          } catch (err) {
            dispatch(LoginFail(err));
          }
        })}
      >
        <label>Username</label>
        <input
          type="text"
          {...form.register("username")}
          className="loginInput"
          placeholder="Enter your username..."
        />
        <FormInputErrors error={form.formState.errors.username} />
        <label>Password</label>
        <input
          type="password"
          {...form.register("password")}
          className="loginInput"
          placeholder="Enter your password..."
        />
        <button
          className="loginButton"
          type="submit"
          disabled={state.isFetching}
        >
          Login
        </button>
      </form>
      <button className="loginRegisterButton" type="submit">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Login;
