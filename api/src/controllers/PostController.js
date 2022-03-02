import User from "../models/User";
import Post from "../models/Post";
import {
  uploadFileToCloude,
  deleteFileFromCloude,
} from "../firebase/storageFunctions";

const addPost = async (req, res, next) => {
  console.log(req.body);
  const newPost = new Post(req.body);
  try {
    const uploadResult = await uploadFileToCloude(
      req.file,
      `posts/${req.user.username}`
    );
    try {
      newPost.photo = uploadResult;
      newPost.isConfirmed = false;
      newPost.username = req.user.username;
      const savedPost = await newPost.save();

      res.status(200).json({
        message: "Post has been added...",
        model: { post: savedPost },
        success: true,
      });
    } catch (err) {
      if (newPost._id) {
        await Post.findByIdAndDelete(newPost._id);
      }
      if (uploadResult) {
        try {
          await deleteFileFromCloude(uploadResult.fileFullName);
        } catch (err) {
          console.log(err);
        }
      }
      res.status(500).json({
        message: "Error while saving post",
        error: err.toString(),
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error while uploading file",
      error: err.toString(),
      success: false,
    });
  }
};

const getAllPosts = async (req, res, next) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json({
      message: "Posts has been fetched...",
      model: { posts },
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching posts",
      error: err,
      success: false,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.user.username || req.isAdmin) {
      req.body.isConfirmed = false;
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json({
          message: "Post has been updated",
          model: { post: updatedPost },
          success: true,
        });
      } catch (err) {
        res.status(500).json({
          message: "Error while updating post",
          error: err,
          success: false,
        });
      }
    } else {
      res
        .status(401)
        .json({ message: "You can update only your post!", success: false });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error while updating post",
      error: err,
      success: false,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json({
          message: "Post has been deleted",
          model: {
            post,
          },
          success: true,
        });
      } catch (err) {
        res.status(500).json({
          message: "Error while deleting post",
          error: err,
          success: false,
        });
      }
    } else {
      res
        .status(401)
        .json({ message: "You can delete only your post!", success: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Error while deleting post", error: err });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      message: "Post has been fetched",
      model: { post },
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching post",
      error: err,
      success: false,
    });
  }
};

const confirmPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found", success: false });
    } else {
      post.isConfirmed = true;

      const updatedPost = await post.save();
      res.status(200).json({
        message: "Post has been confirmed",
        model: { post: updatedPost },
        success: true,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error while confirming post",
      error: err,
      success: false,
    });
  }
};

export { addPost, getAllPosts, updatePost, deletePost, getPost, confirmPost };
