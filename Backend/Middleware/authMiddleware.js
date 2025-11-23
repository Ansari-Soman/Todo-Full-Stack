import jwt from "jsonwebtoken";
import asyncHandler from "../Utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decode.id;
  next();
});
