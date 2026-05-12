require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const { Admin, Course, Testimonial } = require("./models");

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/nextstep-academy");
  console.log("Connected to MongoDB");

  // ── Admin ────────────────────────────────────────────────────────────────
  const existing = await Admin.findOne({ email: "admin@nextstepacademy.com" });
  if (!existing) {
    await Admin.create({
      name:     "NextStep Admin",
      email:    "admin@nextstepacademy.com",
      password: await bcrypt.hash("NSAdmin@2025!", 12),
      role:     "super-admin",
    });
    console.log("✅ Admin created — admin@nextstepacademy.com / NSAdmin@2025!");
  } else {
    console.log("ℹ️  Admin already exists");
  }

  // ── Sample Courses ────────────────────────────────────────────────────────
  const courseCount = await Course.countDocuments();
  if (courseCount === 0) {
    await Course.insertMany([
      {
        title:            "Foundation Course",
        slug: "foundation-course",
        shortDescription: "A structured program designed to build strong academic basics for young learners.",
        fullDescription:  "Our Foundation Course is meticulously designed to give young learners the academic building blocks they need for lifelong success. Through engaging, personalized one-to-one sessions, students develop strong fundamentals in core subjects while building confidence and a genuine love for learning.",
        image:            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
        imagePublicId:    "placeholder",
        category:         "foundation",
        duration:         "Flexible",
        rating:           4.9,
        studentCount:     180,
        badge:            "Popular",
        isFeatured:       true,
        isActive:         true,
        highlights: [
          "One-to-one personalized sessions",
          "Concept clarity & confidence building",
          "Ideal for early learners (Pre-KG to Grade 5)",
          "Flexible scheduling options",
          "Progress reports for parents",
          "Expert, vetted tutors",
        ],
        curriculum: [
          { title: "Core Subjects", items: ["English Reading & Writing", "Basic Mathematics", "Environmental Science", "General Knowledge"] },
          { title: "Skills Development", items: ["Critical thinking", "Study habits", "Communication skills"] },
        ],
        faqs: [
          { question: "What age group is this for?", answer: "This course is ideal for students from Pre-KG to Grade 5, but can be adapted for older students needing foundational support." },
          { question: "How many sessions per week?", answer: "We recommend 3 sessions per week for optimal progress, but we can adjust based on your needs." },
        ],
      },
      {
        title:            "Advanced Language Course",
        slug: "advanced-language-course",
        shortDescription: "In-depth grammar, comprehension, writing, and vocabulary for confident, effective communication.",
        fullDescription:  "Our Advanced Language Course provides comprehensive training in English language skills, going well beyond basic grammar. Students develop the ability to communicate with clarity, precision, and confidence — skills that are essential for academic excellence and professional success.",
        image:            "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
        imagePublicId:    "placeholder",
        category:         "language",
        duration:         "8 Weeks",
        rating:           4.8,
        studentCount:     120,
        badge:            "Bestseller",
        isFeatured:       true,
        isActive:         true,
        highlights: [
          "In-depth grammar and sentence structure",
          "Advanced reading comprehension",
          "Creative and formal writing",
          "Vocabulary enhancement",
          "Individual and batch classes",
          "Personalized guidance",
        ],
        curriculum: [
          { title: "Grammar Mastery", items: ["Parts of speech", "Tenses & aspects", "Complex sentence structures", "Common errors & corrections"] },
          { title: "Writing Skills", items: ["Essay writing", "Creative writing", "Formal letters & reports", "Persuasive writing"] },
        ],
        faqs: [
          { question: "Is this suitable for non-native English speakers?", answer: "Absolutely. Our tutors are experienced in teaching English as a second language and adapt their approach accordingly." },
        ],
      },
      {
        title:            "Spoken Language Course",
        slug: "spoken-language-course",
        shortDescription: "Build real speaking fluency, pronunciation, and conversational confidence through daily interactive practice.",
        fullDescription:  "Confidence in spoken English opens doors. Our Spoken Language Course helps students develop natural fluency, correct pronunciation, and the ability to express themselves clearly in any situation — from classroom presentations to professional conversations.",
        image:            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
        imagePublicId:    "placeholder",
        category:         "spoken-language",
        duration:         "6 Weeks",
        rating:           4.9,
        studentCount:     95,
        badge:            "New",
        isFeatured:       true,
        isActive:         true,
        highlights: [
          "Improve speaking fluency & pronunciation",
          "Expand vocabulary and sentence formation",
          "Boost confidence in conversations",
          "Daily interactive exercises",
          "Individual & batch classes",
          "Real-world practice scenarios",
        ],
        curriculum: [],
        faqs: [],
      },
      {
        title:            "Cursive Writing Course",
        slug: "cursive-writing-course",
        shortDescription: "Master elegant cursive handwriting through structured instruction focused on letter formation, speed, and neatness.",
        fullDescription:  "Our Cursive Writing Course provides structured, step-by-step instruction in beautiful cursive handwriting. Students progress from correct letter formation through to smooth joining, increasing speed, and professional presentation — with daily guided practice and expert feedback.",
        image:            "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
        imagePublicId:    "placeholder",
        category:         "cursive-writing",
        duration:         "4 Weeks",
        rating:           4.7,
        studentCount:     60,
        isFeatured:       true,
        isActive:         true,
        highlights: [
          "Proper letter formation & joining techniques",
          "Writing speed and consistency",
          "Neatness and presentation skills",
          "Daily guided practice with expert feedback",
        ],
        curriculum: [],
        faqs: [],
      },
    ]);
    console.log("✅ Sample courses created");
  } else {
    console.log("ℹ️  Courses already exist, skipping");
  }

  // ── Sample Testimonials ──────────────────────────────────────────────────
  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany([
      {
        name:       "Mrs. Priya Sharma",
        role:       "Parent of Grade 6 Student, Dubai",
        rating:     5,
        review:     "My daughter's confidence has transformed completely. Within just two months with NextStep Academy, she went from dreading English class to actively participating and topping her grade. The tutor's patience and personalized approach made all the difference.",
        isFeatured: true,
        isActive:   true,
        successStory: {
          before: "Struggling with English, low confidence",
          after:  "Top of class, confident speaker",
        },
      },
      {
        name:       "Mr. Rahul Menon",
        role:       "Parent of Grade 9 Student, Sharjah",
        rating:     5,
        review:     "We tried several tutoring services before finding NextStep Academy. The difference is remarkable — the one-to-one attention means the tutor truly understands my son's learning style and pace. His grades have improved significantly across all subjects.",
        isFeatured: true,
        isActive:   true,
      },
      {
        name:       "Mrs. Fatima Al Hashemi",
        role:       "Parent of twin daughters, Abu Dhabi",
        rating:     5,
        review:     "Enrolling both my daughters was the best decision we made this year. Each child gets completely personalized sessions tailored to her level. The flexible scheduling works perfectly for our family, and the tutors are warm, professional, and genuinely invested in the girls' progress.",
        isFeatured: true,
        isActive:   true,
      },
    ]);
    console.log("✅ Sample testimonials created");
  } else {
    console.log("ℹ️  Testimonials already exist, skipping");
  }

  console.log("🌱 Seeding complete!");
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
