import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authmiddleware = async (req, res, next) => {
  try {
    let token;

    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOCKEN);

    const user = await User.findById(decoded._id)
      .select("-password -refreshToken");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        msg: "Token expired. Please login again."
      });
    }

    return res.status(401).json({
      msg: "Invalid token",
      error: error.message
    });
  }
};

export { authmiddleware };
