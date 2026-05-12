// ── auth.js middleware ─────────────────────────────────────────────────────
const jwt     = require("jsonwebtoken");
const { Admin } = require("../models");

const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized — no token" });
  }
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id).select("-password");
    if (!req.admin) return res.status(401).json({ success: false, message: "Admin not found" });
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { protect };
