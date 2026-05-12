const express  = require("express");
const { Course } = require("../models");
const { protect } = require("../middleware/auth");
const { uploadCourseImage, deleteFromCloudinary } = require("../config/cloudinary");

const router = express.Router();

// GET /api/courses — public
router.get("/", async (req, res) => {
  const { category, featured, active = "true" } = req.query;
  const filter = {};

  if (active === "true")      filter.isActive   = true;
  if (featured === "true")    filter.isFeatured  = true;
  if (category && category !== "all") filter.category = category;

  const courses = await Course.find(filter).sort({ isFeatured: -1, createdAt: -1 });
  res.json({ success: true, data: courses, total: courses.length });
});

// GET /api/courses/:slug — public (by slug OR id)
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const course =
    await Course.findOne({ slug, isActive: true }) ||
    await Course.findById(slug).catch(() => null);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });
  res.json({ success: true, data: course });
});

// POST /api/courses — admin only
router.post("/", protect, uploadCourseImage, async (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, message: "Course image is required" });

  const body = req.body;
  const course = await Course.create({
    ...body,
    image:         req.file.path,
    imagePublicId: req.file.filename,
    highlights:    JSON.parse(body.highlights || "[]"),
    curriculum:    JSON.parse(body.curriculum || "[]"),
    faqs:          JSON.parse(body.faqs       || "[]"),
    isFeatured:    body.isFeatured === "true",
    isActive:      body.isActive   !== "false",
  });

  res.status(201).json({ success: true, data: course, message: "Course created successfully" });
});

// PUT /api/courses/:id — admin only
router.put("/:id", protect, uploadCourseImage, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });

  const body = req.body;
  const updates = {
    ...body,
    highlights: body.highlights ? JSON.parse(body.highlights) : course.highlights,
    curriculum: body.curriculum ? JSON.parse(body.curriculum) : course.curriculum,
    faqs:       body.faqs       ? JSON.parse(body.faqs)       : course.faqs,
    isFeatured: body.isFeatured !== undefined ? body.isFeatured === "true" : course.isFeatured,
    isActive:   body.isActive   !== undefined ? body.isActive   !== "false" : course.isActive,
  };

  if (req.file) {
    await deleteFromCloudinary(course.imagePublicId);
    updates.image         = req.file.path;
    updates.imagePublicId = req.file.filename;
  }

  const updated = await Course.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  res.json({ success: true, data: updated, message: "Course updated successfully" });
});

// DELETE /api/courses/:id — admin only
router.delete("/:id", protect, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });
  await deleteFromCloudinary(course.imagePublicId);
  await course.deleteOne();
  res.json({ success: true, message: "Course deleted successfully" });
});

// PATCH /api/courses/:id/featured — toggle
router.patch("/:id/featured", protect, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });
  course.isFeatured = !course.isFeatured;
  await course.save();
  res.json({ success: true, data: course });
});

// PATCH /api/courses/:id/active — toggle
router.patch("/:id/active", protect, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });
  course.isActive = !course.isActive;
  await course.save();
  res.json({ success: true, data: course });
});

module.exports = router;
