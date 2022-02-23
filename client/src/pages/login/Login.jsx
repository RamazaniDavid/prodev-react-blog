import React from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm">
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Login;
