const filterButtons = document.querySelectorAll('.course-tabs button');
const courseCards = document.querySelectorAll('.course-card');

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    courseCards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
const courseData = {
  "foundation": {
    title: "Foundation Course",
    image: "assets/Course-FoundationCourse.png",
    description:
      "A structured program designed to build strong academic basics for young learners.",
    details: [
      "One-to-one personalized sessions",
      "Concept clarity & confidence building",
      "Ideal for early learners",
      "Flexible scheduling options"
    ]
  } ,
  "adv-lang":{
    title: "Advanced Language Course",
    image: "assets/course-lang.jpg",
    description:
      "Focused training in grammar, comprehension, writing, and vocabulary to build clear, confident, and effective communication, with personalised guidance through individual and batch classes.",
    details: [
      "In-depth grammar and sentence structure",
      "Advanced reading comprehension skills",
      "Creative and formal writing skills",
      "Vocabulary enhancement & precise usage",
      "Individual courses & batch classes available",
      "Personalized guidance for every student"
    ]

  },
  "spoken-lang":{
    title: "Spoken Language Course",
    image: "assets/Course-SpokenLanguage.png",
    description:
      "Improve speaking fluency & pronunciation Expand vocabulary and sentence formationBoost confidence in conversationsDaily practice with interactive exercisesIndividual courses & batch classes availablePersonalized guidance for every student",
    details: [
      "Improve speaking fluency & pronunciation",
      "Expand vocabulary and sentence formation",
      "Boost confidence in conversations",
      "Daily practice with interactive exercises",
      "Individual courses & batch classes available",
      "Personalized guidance for every student"
    ]
  },
  "main-cursive":{
    title: "Cursive Writing Course",
    image: "assets/course-cursive-final.png",
    description:
      "Structured cursive instruction focused on correct letter formation, smooth joining, writing speed, and neat presentation, supported by daily guided practice and expert feedback.",
    details: [
      "Proper letter formation & joining techniques",
      "Writing speed and consistency",
      "Neatness and presentation skills",
      "Daily guided practice with expert feedback one for this cursive writing course",
    ]
  },
  "art-craft":{
    title: "Art and Craft Courses",
    image: "assets/course-skill.jpg",
    description:
      "Structured cursive instruction focused on correct letter formation, smooth joining, writing speed, and neat presentation, supported by daily guided practice and expert feedback.",
    details: [
      "Proper letter formation & joining techniques",
      "Writing speed and consistency",
      "Neatness and presentation skills",
      "Daily guided practice with expert feedback one for this cursive writing course",
    ]
  },
  "pnw-counselling":{
    title: "Parent and Ward Counselling",
    image: "assets/course-counselling.png",
    description:
      "Structured cursive instruction focused on correct letter formation, smooth joining, writing speed, and neat presentation, supported by daily guided practice and expert feedback.",
    details: [
      "Proper letter formation & joining techniques",
      "Writing speed and consistency",
      "Neatness and presentation skills",
      "Daily guided practice with expert feedback one for this cursive writing course",
    ]
  }
};

const overlay = document.getElementById("courseOverlay");
const titleEl = document.getElementById("courseTitle");
const descEl = document.getElementById("courseDescription");
const detailsEl = document.getElementById("courseDetails");
const imageEl = document.getElementById("courseImage");

document.querySelectorAll(".course-more").forEach(link => {
  link.addEventListener("click", () => {
    const key = link.dataset.course;
    const course = courseData[key];

    if (!course) return;

    titleEl.textContent = course.title;
    imageEl.src = course.image;
    descEl.textContent = course.description || "";

    detailsEl.innerHTML = "";
    if (course.details) {
      course.details.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        detailsEl.appendChild(li);
      });
    }

    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});




document.querySelector(".course-close").addEventListener("click", closeModal);
overlay.addEventListener("click", e => {
  if (e.target === overlay) closeModal();
});

function closeModal() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}
function openDemo() {
            document.getElementById("demoOverlay").classList.add("active");
            document.body.style.overflow = "hidden";
        }

function closeDemo() {
        document.getElementById("demoOverlay").classList.remove("active");
        document.body.style.overflow = "";
    }

