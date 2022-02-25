import express from "express";
import { addUser, loginUser } from "../controllers/UserController";
import { checkIfAuthenticated } from "../middlewares/authMiddleware";

const AuthRouter = express.Router();

AuthRouter.post("/register", addUser);
AuthRouter.post("/login", loginUser);

export default AuthRouter;
