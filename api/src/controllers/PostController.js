import User from "../models/User";
import Post from "../models/Post";
import {
  uploadFileToCloude,
  deleteFileFromCloude,
} from "../firebase/storageFunctions";

const addPost = async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const uploadResult = await uploadFileToCloude(
      req.file,
      `posts/${req.user.username}`
    );
    try {
      newPost.title = " Sds fd";
      newPost.desc = " Sds fd";
      newPost.photo = uploadResult;
      newPost.isConfirmed = false;
      newPost.username = req.user.username;
      const savedPost = await newPost.save();

      res.status(200).json(savedPost);
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
      res.status(500).json({ error: err.toString() });
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
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
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
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
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json({ error: err.toString() });
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const confirmPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json("Post not found!");
    } else {
      post.isConfirmed = true;

      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

export { addPost, getAllPosts, updatePost, deletePost, getPost, confirmPost };
