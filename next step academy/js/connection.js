const whatsappNumber = "919567175595";

document.querySelectorAll("[data-whatsapp]").forEach(el => {
  el.addEventListener("click", () => {
    const courseName =
      el.dataset.courseName || "a course at NextStep Academy";

    const message = `Hi, I'm interested in ${courseName}. Please share details.`;
    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  });
});
const demoForm = document.getElementById("demoForm");

if (demoForm) {
  demoForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const name = document.getElementById("demoName").value.trim();
    const studentClass = document.getElementById("demoClass").value.trim();
    const userWhatsapp = document.getElementById("demoWhatsapp").value.trim();

    if (!name || !studentClass || !userWhatsapp) {
      alert("Please fill all details");
      return;
    }

    const message = `
        Hi, I would like to book a FREE Demo Class.
        Student Name: ${name}
        Class / Grade: ${studentClass}
        Contact Number: ${userWhatsapp}
        `;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    closeDemo();
  });
}
const navToggle = document.querySelector(".nav-toggle");
const navTabs = document.querySelector(".navtabs");

if (navToggle && navTabs) {
  navToggle.addEventListener("click", () => {
    navTabs.classList.toggle("open");
  });
}
document.querySelectorAll(".scroll-arrow").forEach(arrow => {
  const container = arrow.nextElementSibling;

  arrow.addEventListener("click", () => {
    container.scrollBy({
      left: container.clientWidth * 0.8,
      behavior: "smooth"
    });
  });

  container.addEventListener("scroll", () => {
    const atEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

    arrow.style.opacity = atEnd ? "0" : "1";
    arrow.style.pointerEvents = atEnd ? "none" : "auto";
  });
});
(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;
    lastScrollY = scrollY;

    const isMobile = window.innerWidth < 768;
    const maxDrift = isMobile ? 14 : 40;
    const maxRotate = isMobile ? 4 : 12;

    const x = Math.sin(scrollY * 0.004) * maxDrift;
    const r = Math.min(Math.max(scrollY * 0.01, -maxRotate), maxRotate);

    document.documentElement.style.setProperty("--swirl-x", `${x}px`);
    document.documentElement.style.setProperty("--swirl-rotate", `${r}deg`);
  });
})();
(() => {
  const header = document.querySelector(".site-header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 10) {
      header.classList.remove("nav-hidden");
      header.classList.remove("nav-scrolled");
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      header.classList.add("nav-hidden");
    } 
    else if (currentScrollY < lastScrollY) {
      header.classList.remove("nav-hidden");
    }

    if (currentScrollY > 10) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }

    lastScrollY = currentScrollY;
  });
})();