const mongoose = require("mongoose");
const slugify  = require("slugify");

// ═══════════════════════════════════════════════════════════════════════════
//  COURSE MODEL
// ═══════════════════════════════════════════════════════════════════════════

const CurriculumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [{ type: String }],
}, { _id: false });

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
}, { _id: false });

const CourseSchema = new mongoose.Schema({
  title:            { type: String, required: true, trim: true },
  slug:             { type: String, unique: true, index: true },
  shortDescription: { type: String, required: true, maxlength: 280 },
  fullDescription:  { type: String, required: true },
  image:            { type: String, required: true },       // Cloudinary URL
  imagePublicId:    { type: String, required: true },       // Cloudinary public_id
  category: {
    type: String,
    enum: ["foundation", "language", "spoken-language", "cursive-writing", "art-craft", "counselling","one-to-one"],
    required: true,
  },
  duration:     { type: String, required: true, default: "Flexible" },
  rating:       { type: Number, min: 1, max: 5, default: 4.8 },
  studentCount: { type: Number, default: 0 },
  badge:        { type: String, enum: ["Popular", "New", "Bestseller", "Featured", null], default: null },
  highlights:   [{ type: String }],
  curriculum:   [CurriculumSchema],
  faqs:         [FAQSchema],
  price:        { type: String },
  isFeatured:   { type: Boolean, default: false },
  isActive:     { type: Boolean, default: true },
}, { timestamps: true });

// Auto-generate slug before save
CourseSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// ═══════════════════════════════════════════════════════════════════════════
//  TESTIMONIAL MODEL
// ═══════════════════════════════════════════════════════════════════════════

const TestimonialSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  role:     { type: String, required: true },
  avatar:   { type: String },              // Cloudinary URL
  avatarPublicId: { type: String },
  rating:   { type: Number, min: 1, max: 5, required: true },
  review:   { type: String, required: true },
  videoUrl: { type: String },
  successStory: {
    before: { type: String },
    after:  { type: String },
  },
  isActive:   { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

// ═══════════════════════════════════════════════════════════════════════════
//  LEAD MODEL
// ═══════════════════════════════════════════════════════════════════════════

const LeadSchema = new mongoose.Schema({
  studentName:    { type: String, required: true, trim: true },
  parentName:     { type: String, trim: true },
  grade:          { type: String, required: true },
  whatsapp:       { type: String, required: true },
  email:          { type: String, trim: true, lowercase: true },
  courseInterest: { type: String },
  message:        { type: String },
  source: {
    type: String,
    enum: ["demo-form", "course-inquiry", "whatsapp-cta", "contact-form"],
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "contacted", "enrolled", "not-interested"],
    default: "new",
  },
  notes: { type: String },
}, { timestamps: true });

// ═══════════════════════════════════════════════════════════════════════════
//  ADMIN MODEL
// ═══════════════════════════════════════════════════════════════════════════

const AdminSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role:     { type: String, enum: ["super-admin", "admin"], default: "admin" },
}, { timestamps: true });

// ═══════════════════════════════════════════════════════════════════════════
//  TUTOR APPLICATION MODEL
// ═══════════════════════════════════════════════════════════════════════════

const TutorApplicationSchema = new mongoose.Schema({
  name:          { type: String, required: true, trim: true },
  email:         { type: String, required: true, trim: true, lowercase: true },
  whatsapp:      { type: String, required: true },
  qualification: { type: String, required: true },
  subjects:      { type: String, required: true },
  experience:    { type: String, required: true },
  availability:  { type: String, required: true },
  bio:           { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "reviewing", "accepted", "rejected"],
    default: "pending",
  },
}, { timestamps: true });

// ── Exports ────────────────────────────────────────────────────────────────
module.exports = {
  Course:           mongoose.model("Course",           CourseSchema),
  Testimonial:      mongoose.model("Testimonial",      TestimonialSchema),
  Lead:             mongoose.model("Lead",             LeadSchema),
  Admin:            mongoose.model("Admin",            AdminSchema),
  TutorApplication: mongoose.model("TutorApplication", TutorApplicationSchema),
};
