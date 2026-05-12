// ──────────────────────────────────────────────────────────────────────────
//  ROUTES/TESTIMONIALS.JS
// ──────────────────────────────────────────────────────────────────────────
const express = require("express");
const { Testimonial } = require("../models");
const { protect }     = require("../middleware/auth");
const { uploadAvatarImage, deleteFromCloudinary } = require("../config/cloudinary");

const router = express.Router();

// GET /api/testimonials — public
router.get("/", async (req, res) => {
  const { featured, active = "true" } = req.query;
  const filter = {};
  if (active === "true")   filter.isActive   = true;
  if (featured === "true") filter.isFeatured  = true;

  const testimonials = await Testimonial.find(filter).sort({ isFeatured: -1, createdAt: -1 });
  res.json({ success: true, data: testimonials });
});

// POST /api/testimonials — admin
router.post("/", protect, uploadAvatarImage, async (req, res) => {
  const body = req.body;
  const testimonial = await Testimonial.create({
    ...body,
    rating:     Number(body.rating),
    isFeatured: body.isFeatured === "true",
    isActive:   body.isActive   !== "false",
    avatar:         req.file ? req.file.path     : undefined,
    avatarPublicId: req.file ? req.file.filename : undefined,
    successStory:   body.successStory ? JSON.parse(body.successStory) : undefined,
  });
  res.status(201).json({ success: true, data: testimonial });
});

// PUT /api/testimonials/:id — admin
router.put("/:id", protect, uploadAvatarImage, async (req, res) => {
  const t = await Testimonial.findById(req.params.id);
  if (!t) return res.status(404).json({ success: false, message: "Testimonial not found" });

  const body    = req.body;
  const updates = {
    ...body,
    rating:       body.rating ? Number(body.rating) : t.rating,
    isFeatured:   body.isFeatured !== undefined ? body.isFeatured === "true" : t.isFeatured,
    isActive:     body.isActive   !== undefined ? body.isActive   !== "false" : t.isActive,
    successStory: body.successStory ? JSON.parse(body.successStory) : t.successStory,
  };
  if (req.file) {
    await deleteFromCloudinary(t.avatarPublicId);
    updates.avatar         = req.file.path;
    updates.avatarPublicId = req.file.filename;
  }
  const updated = await Testimonial.findByIdAndUpdate(req.params.id, updates, { new: true });
  res.json({ success: true, data: updated });
});

// DELETE /api/testimonials/:id — admin
router.delete("/:id", protect, async (req, res) => {
  const t = await Testimonial.findById(req.params.id);
  if (!t) return res.status(404).json({ success: false, message: "Testimonial not found" });
  await deleteFromCloudinary(t.avatarPublicId);
  await t.deleteOne();
  res.json({ success: true, message: "Testimonial deleted" });
});

module.exports = router;


// ──────────────────────────────────────────────────────────────────────────
//  NOTE: Remaining routes are in separate files below
// ──────────────────────────────────────────────────────────────────────────
