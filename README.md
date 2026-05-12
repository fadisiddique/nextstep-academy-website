# NextStep Academy — Full-Stack Platform

A production-grade online education platform built with **Next.js 14**, **Express.js**, and **MongoDB Atlas**.

---

## 🗂 Project Structure

```
nextstep/
├── frontend/                   # Next.js 14 App Router
│   ├── app/
│   │   ├── page.tsx            # Home page
│   │   ├── courses/
│   │   │   ├── page.tsx        # Courses listing with filter
│   │   │   └── [slug]/         # Dynamic course detail (SEO-friendly)
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── become-a-tutor/page.tsx
│   │   └── admin/
│   │       ├── page.tsx        # Dashboard
│   │       ├── login/page.tsx
│   │       ├── courses/page.tsx
│   │       ├── testimonials/page.tsx
│   │       └── leads/page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CourseCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── DemoModal.tsx
│   │   └── sections/           # All home page sections
│   ├── lib/api.ts              # Axios API client
│   └── types/index.ts          # All TypeScript types
│
└── backend/                    # Express.js REST API
    └── src/
        ├── index.js            # Server entry point
        ├── models/index.js     # All Mongoose models
        ├── routes/
        │   ├── auth.js
        │   ├── courses.js
        │   ├── testimonials.js
        │   ├── leads.js
        │   ├── dashboard.js
        │   ├── contact.js
        │   └── tutorApplications.js
        ├── middleware/
        │   ├── auth.js         # JWT protect middleware
        │   └── errorHandler.js
        ├── config/cloudinary.js
        └── seed.js             # Initial data seeder
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)

---

### 1. Clone & Install

```bash
# Backend
cd nextstep/backend
npm install

# Frontend
cd nextstep/frontend
npm install
```

---

### 2. Environment Setup

```bash
# Backend — copy template and fill values
cp .env.template backend/.env

# Frontend — copy template and fill values
cp .env.template frontend/.env.local
```

Required values in `backend/.env`:
- `MONGODB_URI` — your MongoDB Atlas connection string
- `JWT_SECRET` — any long random string (min 32 chars)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `SMTP_EMAIL` + `SMTP_PASS` — Gmail address + App Password

Required in `frontend/.env.local`:
- `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

---

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This creates:
- Admin user: `admin@nextstepacademy.com` / `NSAdmin@2025!`
- 4 sample courses
- 3 sample testimonials

---

### 4. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev      # Runs on http://localhost:5000

# Terminal 2 — Frontend
cd frontend
npm run dev      # Runs on http://localhost:3000
```

---

## 🗄 Database Schema

### Course
| Field | Type | Notes |
|-------|------|-------|
| title | String | Required |
| slug | String | Auto-generated, unique |
| shortDescription | String | Max 280 chars |
| fullDescription | String | Rich text |
| image | String | Cloudinary URL |
| imagePublicId | String | For deletion |
| category | Enum | foundation, language, etc. |
| duration | String | e.g. "8 Weeks" |
| rating | Number | 1-5 |
| studentCount | Number | |
| badge | Enum | Popular, New, Bestseller, Featured |
| highlights | String[] | Bullet points |
| curriculum | Array | { title, items[] } |
| faqs | Array | { question, answer } |
| price | String | e.g. "AED 250/month" |
| isFeatured | Boolean | Shows on homepage |
| isActive | Boolean | Published |

### Lead
| Field | Type | Notes |
|-------|------|-------|
| studentName | String | Required |
| grade | String | Required |
| whatsapp | String | Required |
| parentName | String | Optional |
| email | String | Optional |
| courseInterest | String | |
| source | Enum | demo-form, course-inquiry, etc. |
| status | Enum | new, contacted, enrolled, not-interested |

---

## 🔌 API Reference

### Public Endpoints
```
GET    /api/courses                     # All active courses
GET    /api/courses/:slug               # Course by slug
GET    /api/testimonials                # All active testimonials
POST   /api/leads                       # Submit inquiry/demo form
POST   /api/contact                     # Contact form
POST   /api/tutor-applications          # Tutor application
GET    /health                          # Health check
```

### Admin Endpoints (JWT required)
```
POST   /api/auth/login                  # Admin login
GET    /api/auth/me                     # Current admin
PUT    /api/auth/change-password

GET    /api/courses                     # All courses (incl. inactive)
POST   /api/courses                     # Create + upload image
PUT    /api/courses/:id                 # Update + replace image
DELETE /api/courses/:id                 # Delete + remove from Cloudinary
PATCH  /api/courses/:id/featured        # Toggle featured
PATCH  /api/courses/:id/active          # Toggle active

POST   /api/testimonials
PUT    /api/testimonials/:id
DELETE /api/testimonials/:id

GET    /api/leads                       # All leads
GET    /api/leads/export                # CSV export
PATCH  /api/leads/:id/status            # Update status
DELETE /api/leads/:id

GET    /api/dashboard/stats             # Dashboard numbers
GET    /api/tutor-applications          # All applications
PATCH  /api/tutor-applications/:id/status
```

---

## 🎨 Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `maroon-800` | `#6B1A2A` | Primary brand, CTAs, headings |
| `gold-500` | `#C9973A` | Accents, ratings, featured badges |
| `peach-500` | `#E8936A` | Gradient accents |
| `cream-50/100` | `#FDFBF7 / #FAF7F2` | Page backgrounds |
| `charcoal-900` | `#1C1C1E` | Body text |

### Typography
- **Headings:** Outfit (700/800 weight)
- **Body:** Inter (400/500 weight)
- **Scale:** H1=64px, H2=40px, H3=28px, Body=18px, Small=14px

### Component Classes (global CSS)
- `.btn-primary` — maroon filled button
- `.btn-secondary` — white outline button
- `.btn-gold` — gold filled button
- `.card` — white rounded card with border
- `.card-hover` — card with hover lift
- `.input` — styled form input
- `.label` — form label
- `.section-pill` — category badge
- `.skeleton` — loading skeleton

---

## 🚢 Deployment

### Frontend → Vercel

```bash
cd frontend
vercel --prod
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api`

### Backend → Render

1. Create new **Web Service** on Render
2. Connect GitHub repo, set root to `backend/`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all `.env` variables in Render dashboard

### MongoDB → Atlas
1. Create free cluster on mongodb.com
2. Add IP `0.0.0.0/0` to network access
3. Copy connection string to `MONGODB_URI`

---

## 🔒 Security

- All admin routes protected with JWT middleware
- Passwords hashed with bcrypt (salt rounds: 12)
- Rate limiting on all API routes (200 req/15min) and auth (10 req/15min)
- CORS restricted to frontend domain
- Helmet.js security headers
- File uploads go directly to Cloudinary (no local storage)
- Input validation on all routes

---

## 📈 SEO

- Dynamic `generateMetadata` per course page
- OpenGraph tags on all pages
- Semantic HTML throughout
- Slug-based URLs: `/courses/foundation-course`
- `generateStaticParams` for ISR on course pages (revalidate: 1hr)

---

## 📧 Admin Credentials (after seeding)

```
Email:    admin@nextstepacademy.com
Password: NSAdmin@2025!
```

**⚠️ Change this immediately after first login in production.**
