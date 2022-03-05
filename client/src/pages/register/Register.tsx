import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import  {registerSchema, RegisterFormInputs } from "./register.schema";
import {FormInputErrors} from "../../shared/formInputErrors/FormInputErrors";
import axios from "axios";

const Register = () => {
  const nav = useNavigate();
  const form = useForm<RegisterFormInputs>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: yupResolver(registerSchema),
    criteriaMode: "all",
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: 2000,
  });

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form
        className="registerForm"
        onSubmit={form.handleSubmit(async (d) => {
          let res = await axios.post("/api/auth/register", d);
          if (res.data.success) {
            form.reset();
            nav("/emailSent", { replace: true });
          }
        })}
      >
        <label>Username</label>
        <input className="registerInput" {...form.register("username")} />
        <FormInputErrors error={form.formState.errors.username} />
        <label>Email</label>
        <input className="registerInput" {...form.register("email")} />
        <FormInputErrors error={form.formState.errors.email} />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          {...form.register("password")}
        />
        <FormInputErrors error={form.formState.errors.password} />
        <label>Confirm Password</label>
        <input
          className="registerInput"
          type="password"
          {...form.register("confirmPassword")}
        />
        <FormInputErrors error={form.formState.errors.confirmPassword} />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
};

export default Register;
