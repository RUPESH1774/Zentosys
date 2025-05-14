const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjM4Njc0ZmNjNDdiMmQ2MWVlOTU3OSIsImlhdCI6MTc0NzE1ODY0NSwiZXhwIjoxNzQ3NzYzNDQ1fQ.5zAw7a_4NYkTEfq0jNTt3Qx2Fn9N8PVBhbmVDuaYOG8");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
