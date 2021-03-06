import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    verificationString: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    info: {
      type: Object,
    },

    roles: {
      type: Array,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
