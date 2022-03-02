import bcrypt from "bcrypt";
import config from "../config";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mailer";
import { v4 as uuid } from "uuid";

const addUser = async (req, res, next) => {
  let user;
  try {
    const { email, username, password, info } = req.body;

    if (!username) {
      return res
        .status(422)
        .json({ message: "Username is required", success: false });
    }

    user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(409)
        .json({ message: "Username already exists", success: false });
    }

    user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .json({ message: "Email already exists", success: false });
    }

    if (!password) {
      return res
        .status(422)
        .json({ message: "Password is required", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPass,
      isVerified: false,
      info: {},
      verificationString: uuid(),
    });

    user = await newUser.save();

    tokenGenerator(
      {
        id: user._id,
        verificationString: user.verificationString,
      },
      async (err) => {
        console.log(err);
        await User.findByIdAndDelete(user._id);
        return res
          .status(500)
          .json({ message: "Error On Create Token", success: false });
      },
      async (token) => {
        sendVerificationEmail(
          user,
          token,
          async (err) => {
            console.log(err);
            if (user) await User.findByIdAndDelete(user._id);
            return res.status(500).json({
              message: "Error On Send Verification Email",
              success: false,
            });
          },
          async (info) => {
            res.status(200).json({
              message: "User has been created",
              model: {
                state: "Please verify your email!",
              },
              success: true,
            });
          }
        );
      },
      "2h"
    );
  } catch (err) {
    try {
      if (user) await User.findByIdAndDelete(user._id);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error On Create User", success: false });
    }
    res.status(500).json({ message: "Error On Create User", success: false });
  }
};

const loginUser = async (req, res, next) => {
  let user;
  try {
    const { username, password } = req.body;

    if (!username) {
      return res
        .status(422)
        .json({ message: "Username is required", success: false });
    }

    if (!password) {
      return res
        .status(422)
        .json({ message: "Password is required", success: false });
    }

    user = await User.findOne({ username: username });
    !user &&
      res.status(400).json({ message: "User not found", success: false });

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated &&
      res.status(400).json({ message: "Invalid password", success: false });

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email!", success: false });
    }

    tokenGenerator(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        photo: user.info?.photo,
      },
      (err) => {
        return res
          .status(500)
          .json({ message: "Error On Create Token", success: false });
      },
      (token) => {
        res.status(200).json({
          message: "User has been logged in",
          model: {
            token: token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              isVerified: user.isVerified,
              roles: user.roles,
            },
          },
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error On Login User", success: false });
  }
};

const updateUser = async (req, res) => {
  if (req.user._id === req.params.id || req.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const { roles, isVerified, ...userToUpdate } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: userToUpdate,
        },
        { new: true }
      );

      tokenGenerator(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          roles: user.roles,
          photo: user.info?.photo,
        },
        (err) => {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Error On Create Token", success: false });
        },
        (token) => {
          res.status(200).json({
            message: "User has been updated",
            model: {
              token: token,
              user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                roles: updatedUser.roles,
              },
            },
            success: true,
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error On Update User", success: false });
    }
  } else {
    res
      .status(403)
      .json({ message: "You are not allowed to do this", success: false });
  }
};

const deleteUser = async (req, res) => {
  if (req.user._id === req.params.id || req.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json({ message: "User has been deleted", success: true });
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Error On Delete User", success: false });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "User not found", success: false });
    }
  } else {
    res
      .status(401)
      .json({ message: "You are not allowed to do this", success: false });
  }
};

const getUser = async (req, res) => {
  if (req.user._id === req.params.id || req.isAdmin)
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json({
        message: "User has been found",
        model: {
          user: { ...others },
        },
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error On Get User", success: false });
    }
};

const checkUsernameExist = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username)
      return res
        .status(401)
        .json({ message: "Username is required", success: false });
    const user = await User.findOne({ username });
    res.status(200).json({
      message: `Username is ${user ? "not " : ""}available`,
      model: {
        usernameExist: user ? true : false,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error On Check Username", success: false });
  }
};

const checkEmailExist = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email)
      return res
        .status(401)
        .json({ message: "Email is required", success: false });
    const user = await User.findOne({ email });
    res.status(200).json({
      message: `Email is ${user ? "not " : ""}available`,
      model: {
        emailExist: user ? true : false,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error On Check Email", success: false });
  }
};

const resendVerificationEmail = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    console.log(user);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    if (user.isVerified)
      return res
        .status(400)
        .json({ message: "User is already verified", success: false });
    tokenGenerator(
      {
        id: user._id,
        verificationString: user.verificationString,
      },
      async (err) => {
        console.log(err);
        await User.findByIdAndDelete(user._id);
        return res
          .status(500)
          .json({ message: "Error On Create Token", success: false });
      },
      async (token) => {
        sendVerificationEmail(user.verificationString, token);

        res.status(200).json({
          message: "Verification email has been sent",
          model: {
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              roles: user.roles,
            },
            token: token,
          },
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error On Resend Email", success: false });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res
        .status(401)
        .json({ message: "Token is required", success: false });
    const decoded = jwt.verify(token, config.jwtSecret);
    if (decoded.exp < Date.now() / 1000)
      return res
        .status(401)
        .json({ message: "Token has expired", success: false });
    const user = await User.findById(decoded.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not found", success: false });
    if (user.isVerified)
      return res
        .status(400)
        .json({ message: "User is already verified", success: false });
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "User has been verified", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error On Verify Email", success: false });
  }
};

const sendVerificationEmail = (
  user,
  token,
  fnError = () => {},
  fnSuccess = () => {}
) => {
  try {
    sendMail(
      {
        from: "noreply@ramazanidavid.info",
        to: user.email,
        subject: `Please verify your email, dear ${user.username}`,
        html: `
            <h1>Hello ${user.username}</h1>
            <p>
              Please click on the following link to verify your email:
              <a href="${config.hostURL}/emailVerification/verify/${token}">
                ${config.hostURL}/emailVerification/verify/${token}
              </a>
            </p>
            `,
      },
      (err) => {
        if (err) {
          console.log(err);
          fnError && fnError(err);
        }
      },
      (info) => {
        console.log(info);
        fnSuccess && fnSuccess(info);
      }
    );
  } catch (err) {
    console.log(err);
    fnError && fnError(err);
  }
};

const tokenGenerator = (payload, errorFn, successFn, expiresIn = "1d") => {
  return jwt.sign(
    payload,
    config.jwtSecret,
    { expiresIn: expiresIn },
    (err, token) => {
      if (err) {
        errorFn(err);
      } else {
        successFn(token);
      }
    }
  );
};

export {
  addUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  checkUsernameExist,
  checkEmailExist,
  verifyEmail,
  resendVerificationEmail,
};
