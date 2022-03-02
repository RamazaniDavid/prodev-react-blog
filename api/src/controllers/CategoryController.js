import Category from "../models/category";

const addCategory = async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json({
      message: "Category added successfully",
      model: {
        category: savedCat,
      },
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding category",
      error: err.toString(),
      success: false,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json({
      message: "Categories fetched successfully",
      model: {
        categories: cats,
      },
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching categories",
      error: err.toString(),
      success: false,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    res.status(200).json({
      message: "Category fetched successfully",
      model: { category: cat },
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching category",
      error: err.toString(),
      success: false,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCat = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Category updated successfully",
      model: { category: updatedCat },
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating category", error: err, success: false });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCat = await Category.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({
        message: "Category deleted successfully",
        model: { category: deletedCat },
        success: true,
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: err, success: false });
  }
};

export {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
