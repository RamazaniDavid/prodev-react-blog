import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/CategoryController";
import { checkIfAuthenticatedForAdmin } from "../middlewares/authMiddleware";

const CategoryRouter = express.Router();

CategoryRouter.post("/", checkIfAuthenticatedForAdmin, addCategory);
CategoryRouter.get("/", getAllCategories);
CategoryRouter.delete("/:id", checkIfAuthenticatedForAdmin, deleteCategory);
CategoryRouter.get("/:id", getCategoryById);
CategoryRouter.put("/:id", checkIfAuthenticatedForAdmin, updateCategory);

export default CategoryRouter;
