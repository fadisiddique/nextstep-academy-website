// ── dashboard.js ───────────────────────────────────────────────────────────
const express = require("express");
const { Lead, Course, Testimonial } = require("../models");
const { protect } = require("../middleware/auth");

const dashRouter = express.Router();

// GET /api/dashboard/stats
dashRouter.get("/stats", protect, async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalLeads, newLeads, enrolledStudents, totalCourses, totalTestimonials, recentLeads] =
    await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ createdAt: { $gte: today } }),
      Lead.countDocuments({ status: "enrolled" }),
      Course.countDocuments({ isActive: true }),
      Testimonial.countDocuments({ isActive: true }),
      Lead.find().sort({ createdAt: -1 }).limit(8),
    ]);

  res.json({
    success: true,
    data: { totalLeads, newLeads, enrolledStudents, totalCourses, totalTestimonials, recentLeads },
  });
});

module.exports = dashRouter;


// ── contact.js ─────────────────────────────────────────────────────────────
const contactRouter = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

contactRouter.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message)
    return res.status(400).json({ success: false, message: "All fields are required" });

  // Send to academy
  try {
    await transporter.sendMail({
      from:    `"NextStep Academy Website" <${process.env.SMTP_EMAIL}>`,
      to:      process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch (err) {
    console.error("Email send failed:", err.message);
    // Don't fail the request if email fails
  }

  res.json({ success: true, message: "Message received. We'll get back to you soon!" });
});

module.exports.contactRouter = contactRouter;


// ── tutorApplications.js ───────────────────────────────────────────────────
const tutorRouter = express.Router();
const { TutorApplication } = require("../models");

// POST /api/tutor-applications — public
tutorRouter.post("/", async (req, res) => {
  const { name, email, whatsapp, qualification, subjects, experience, availability, bio } = req.body;
  if (!name || !email || !whatsapp || !qualification || !subjects || !experience || !availability || !bio)
    return res.status(400).json({ success: false, message: "All fields are required" });

  const app = await TutorApplication.create(req.body);
  res.status(201).json({ success: true, data: app, message: "Application submitted successfully" });
});

// GET /api/tutor-applications — admin
tutorRouter.get("/", protect, async (req, res) => {
  const apps = await TutorApplication.find().sort({ createdAt: -1 });
  res.json({ success: true, data: apps });
});

// PATCH /api/tutor-applications/:id/status — admin
tutorRouter.patch("/:id/status", protect, async (req, res) => {
  const { status } = req.body;
  const valid = ["pending", "reviewing", "accepted", "rejected"];
  if (!valid.includes(status))
    return res.status(400).json({ success: false, message: "Invalid status" });

  const app = await TutorApplication.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!app) return res.status(404).json({ success: false, message: "Application not found" });
  res.json({ success: true, data: app });
});

module.exports.tutorRouter = tutorRouter;
