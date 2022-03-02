import User from "../models/User";
import jwt from "jsonwebtoken";

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      jwt.verify(authToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        const _user = await User.findById(decoded.id);
        if (_user) {
          if (!_user.isVerified) {
            return res.status(401).json({ error: "Your Email Not Verified" });
          }
          const { password, ...user } = _user.toObject();
          req.user = user;
          req.isAdmin = req.user.roles.includes("admin");
          next();
        } else {
          return res.status(401).json({ error: "Unauthorized" });
        }
      });
    } catch (err) {
      return res.status(500).json({ error: err.toString() });
    }
  });
};

const checkIfAuthenticatedForAdmin = (req, res, next) => {
  checkIfAuthenticated(req, res, async () => {
    if (!req.isAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  });
};

const checkIfAuthenticatedForUser = (req, res, next) => {
  checkIfAuthenticated(req, res, async () => {
    if (req.isAdmin) {
      next();
    } else if (
      !req.body.username ||
      req.params.username === req.user.username
    ) {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  });
};

export {
  checkIfAuthenticated,
  checkIfAuthenticatedForAdmin,
  checkIfAuthenticatedForUser,
};
