const express  = require("express");
const { Lead } = require("../models");
const { protect } = require("../middleware/auth");

const router = express.Router();

// POST /api/leads — public (lead capture)
router.post("/", async (req, res) => {
  const { studentName, grade, whatsapp, parentName, email, courseInterest, message, source } = req.body;
  if (!studentName || !grade || !whatsapp)
    return res.status(400).json({ success: false, message: "studentName, grade, and whatsapp are required" });

  const lead = await Lead.create({
    studentName, grade, whatsapp, parentName, email,
    courseInterest, message,
    source: source || "demo-form",
  });

  res.status(201).json({ success: true, data: lead, message: "Lead captured successfully" });
});

// GET /api/leads — admin only
router.get("/", protect, async (req, res) => {
  const { status, page = 1, limit = 50 } = req.query;
  const filter = status && status !== "all" ? { status } : {};
  const skip   = (page - 1) * limit;

  const [leads, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Lead.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: leads,
    pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
  });
});

// GET /api/leads/export — CSV export, admin only
router.get("/export", protect, async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  const rows  = leads.map(l => ({
    "Student Name":    l.studentName,
    "Parent Name":     l.parentName || "",
    "Grade":           l.grade,
    "WhatsApp":        l.whatsapp,
    "Email":           l.email || "",
    "Course Interest": l.courseInterest || "",
    "Source":          l.source,
    "Status":          l.status,
    "Message":         l.message || "",
    "Date":            new Date(l.createdAt).toLocaleDateString("en-AE"),
  }));

  const header = Object.keys(rows[0] || {}).join(",");
  const csvRows = rows.map(row => Object.values(row).map(v => `"${String(v).replace(/"/g, '""')}"`).join(","));
  const csv = [header, ...csvRows].join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename="nextstep-leads-${Date.now()}.csv"`);
  res.send(csv);
});

// PATCH /api/leads/:id/status — admin only
router.patch("/:id/status", protect, async (req, res) => {
  const { status, notes } = req.body;
  const valid = ["new", "contacted", "enrolled", "not-interested"];
  if (!valid.includes(status))
    return res.status(400).json({ success: false, message: "Invalid status" });

  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status, ...(notes && { notes }) },
    { new: true }
  );
  if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
  res.json({ success: true, data: lead });
});

// DELETE /api/leads/:id — admin only
router.delete("/:id", protect, async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
  res.json({ success: true, message: "Lead deleted" });
});

module.exports = router;
