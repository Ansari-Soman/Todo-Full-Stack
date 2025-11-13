const User = require("../Model/User");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode == ", decode);
    req.user = await User.findById(decode.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
