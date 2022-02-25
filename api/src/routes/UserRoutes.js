import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/UserController";
import { checkIfAuthenticated } from "../middlewares/authMiddleware";

const UserRouter = express.Router();

UserRouter.put("/:id", checkIfAuthenticated, updateUser);
UserRouter.delete("/:id", checkIfAuthenticated, deleteUser);
UserRouter.get("/:id", checkIfAuthenticated, getUser);

export default UserRouter;
