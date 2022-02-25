import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: Object,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    extraData: {
      type: Array,
    },
    comments: {
      type: Array,
      required: false,
    },
    isConfirmed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
