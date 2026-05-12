// ──────────────────────────────────────────────────────────────────────────
//  ROUTES/AUTH.JS
// ──────────────────────────────────────────────────────────────────────────
const express  = require("express");
const bcrypt   = require("bcryptjs");
const jwt      = require("jsonwebtoken");
const { Admin } = require("../models");
const { protect } = require("../middleware/auth");

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password are required" });

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin || !(await bcrypt.compare(password, admin.password)))
    return res.status(401).json({ success: false, message: "Invalid email or password" });

  const token = signToken(admin._id);
  res.json({
    success: true,
    data: { token, user: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role } },
  });
});

// GET /api/auth/me
router.get("/me", protect, (req, res) => {
  res.json({ success: true, data: req.admin });
});

// PUT /api/auth/change-password
router.put("/change-password", protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin._id).select("+password");
  if (!(await bcrypt.compare(currentPassword, admin.password)))
    return res.status(400).json({ success: false, message: "Current password is incorrect" });
  admin.password = await bcrypt.hash(newPassword, 12);
  await admin.save();
  res.json({ success: true, message: "Password updated successfully" });
});

module.exports = router;
