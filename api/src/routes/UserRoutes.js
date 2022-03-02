import express from "express";
import {
    checkEmailExist,
  checkUsernameExist,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/UserController";
import { checkIfAuthenticated } from "../middlewares/authMiddleware";

const UserRouter = express.Router();

UserRouter.put("/:id", checkIfAuthenticated, updateUser);
UserRouter.delete("/:id", checkIfAuthenticated, deleteUser);
UserRouter.get("/:id", checkIfAuthenticated, getUser);
UserRouter.get("/checkUsername/:username", checkUsernameExist);
UserRouter.get("/checkEmail/:email", checkEmailExist);

export default UserRouter;
