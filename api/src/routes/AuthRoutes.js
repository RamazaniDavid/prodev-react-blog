import express from "express";
import {
  addUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
} from "../controllers/UserController";

const AuthRouter = express.Router();

AuthRouter.post("/register", addUser);
AuthRouter.post("/login", loginUser);
AuthRouter.post("/verifyEmail", verifyEmail);
AuthRouter.post("/resendVerificationEmail", resendVerificationEmail);

export default AuthRouter;
