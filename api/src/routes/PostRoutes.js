import express from "express";
import {
  addPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPost,
  confirmPost,
} from "../controllers/PostController";
import {
  checkIfAuthenticated,
  checkIfAuthenticatedForAdmin,
  checkIfAuthenticatedForUser,
} from "../middlewares/authMiddleware";
import { uploader } from "../middlewares/fileMiddleware";

const PostRouter = express.Router();

PostRouter.post("/", checkIfAuthenticated, uploader.single("file"), addPost);
PostRouter.get("/", getAllPosts);
PostRouter.get("/:id", getPost);
PostRouter.delete("/:id", checkIfAuthenticatedForUser, deletePost);
PostRouter.put("/:id", checkIfAuthenticatedForUser, updatePost);
PostRouter.put("/:id/confirm", checkIfAuthenticatedForAdmin, confirmPost);

export default PostRouter;
