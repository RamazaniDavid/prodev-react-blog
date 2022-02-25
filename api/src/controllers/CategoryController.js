import Category from "../models/category";

const addCategory = async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCat = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCat);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCat = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedCat);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

export { addCategory, getAllCategories , getCategoryById, updateCategory, deleteCategory};
