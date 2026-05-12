const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Course images ──────────────────────────────────────────────────────────
const courseStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:         "nextstep/courses",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 500, crop: "fill", quality: "auto:best" }],
  },
});

// ── Testimonial avatars ────────────────────────────────────────────────────
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:         "nextstep/avatars",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 200, height: 200, crop: "fill", gravity: "face", quality: "auto:good" }],
  },
});

const uploadCourseImage  = multer({ storage: courseStorage }).single("image");
const uploadAvatarImage  = multer({ storage: avatarStorage }).single("avatar");

const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }
};

module.exports = { cloudinary, uploadCourseImage, uploadAvatarImage, deleteFromCloudinary };
