import bcrypt from "bcrypt";
import config from "../config";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mailer";

const addUser = async (req, res, next) => {
  let user;
  try {
    const { email, username, password, info } = req.body;

    if (!username) {
      return res.status(422).json({ error: "Username is required" });
    }

    user = await User.findOne({ username: username });
    if (user) {
      return res.status(409).json({ error: "Username already exists" });
    }

    user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (!password) {
      return res.status(422).json({ error: "Password is required" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPass,
      isVerified: false,
      info: {},
    });

    user = await newUser.save();

    tokenGenerator(
      user,
      async (err) => {
        await User.findByIdAndDelete(user._id);
        return res.status(500).json({ error: err.toString() });
      },
      async (token) => {
        sendMail(
          {
            from: "noreply@ramazanidavid.info",
            to: user.email,
            subject: `New user ${user.username} has been registered`,
            html: `<p>New user ${user.username} has been registered</p>`,
          },
          (err) => {
            if (err) {
              console.log(err);
            }
          },
          (info) => {
            console.log(info);
          }
        );

        res.status(200).json({
          message: "User has been created",
          token: token,
          user: {
            id: user._id,
            username: username,
            email: email,
            isVerified: false,
            roles: [],
          },
        });
      }
    );
  } catch (err) {
    try {
      if (user) await User.findByIdAndDelete(user._id);
    } catch (error) {}
    res.status(500).json({ error: err.toString() });
  }
};

const loginUser = async (req, res, next) => {
  let user;
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(422).json({ error: "Username is required" });
    }

    if (!password) {
      return res.status(422).json({ error: "Password is required" });
    }

    user = await User.findOne({ username: username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    tokenGenerator(
      user,
      (err) => {
        return res.status(500).json({ error: err.toString() });
      },
      (token) => {
        res.status(200).json({
          message: "User has been logged in",
          token: token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            roles: user.roles,
          },
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const updateUser = async (req, res) => {
  if (req.user._id === req.params.id || req.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const { roles, ...userToUpdate } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: userToUpdate,
        },
        { new: true }
      );

      tokenGenerator(
        updatedUser,
        (err) => {
          return res.status(500).json({ error: err.toString() });
        },
        (token) => {
          res.status(200).json({
            message: "User has been updated",
            token: token,
            user: {
              id: updatedUser._id,
              username: updatedUser.username,
              email: updatedUser.email,
              isVerified: updatedUser.isVerified,
              roles: updatedUser.roles,
            },
          });
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
};

const deleteUser = async (req, res) => {
  if (req.user._id === req.params.id || req.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
};

const getUser = async (req, res) => {
  if (req.user._id === req.params.id || req.isAdmin)
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
};

const tokenGenerator = (user, errorFn, successFn) => {
  const { _id, username, email, isVerified, roles } = user;
  return jwt.sign(
    { _id, username, email, isVerified, roles },
    config.jwtSecret,
    { expiresIn: "4d" },
    (err, token) => {
      if (err) {
        errorFn(err);
      } else {
        successFn(token);
      }
    }
  );
};

export { addUser, loginUser, updateUser, deleteUser, getUser };
