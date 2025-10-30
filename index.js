// --- Mobile Menu Toggle Logic ---
const mobileToggle = document.getElementById("mobileToggle");
const header = document.querySelector(".header");
const mainNav = document.querySelector(".nav");

function closeMobileNav() {
  header.classList.remove("nav-open");
  mobileToggle.innerHTML = "☰";
  mobileToggle.setAttribute("aria-expanded", "false");
}

mobileToggle.addEventListener("click", () => {
  const isNavOpen = header.classList.toggle("nav-open");

  if (isNavOpen) {
    mobileToggle.innerHTML = "✕";
    mobileToggle.setAttribute("aria-expanded", "true");
  } else {
    closeMobileNav();
  }
});

// --- Smooth Scroll for Final Navigation Links ---

const allNavLinks = document.querySelectorAll(
  "a.nav__link:not(.nav__link--dropdown-toggle), a.dropdown-menu__link"
);

allNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();

      if (window.innerWidth <= 768) {
        closeAllDropdowns();
        closeMobileNav();
      }

      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileNav();
  }
});

// --- Dropdown Menu Logic ---

const allDropdowns = document.querySelectorAll(".nav__item--dropdown");

function closeAllDropdowns() {
  allDropdowns.forEach((d) => {
    d.classList.remove("is-open");
    d.querySelector(".nav__link--dropdown-toggle").setAttribute(
      "aria-expanded",
      "false"
    );
  });
}

// Add click listener to each dropdown toggle
allDropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".nav__link--dropdown-toggle");

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    if (window.innerWidth <= 768) {
      dropdown.classList.toggle("is-open");
      const isNowOpen = dropdown.classList.contains("is-open");
      toggle.setAttribute("aria-expanded", isNowOpen);
    } else {
      const isCurrentlyOpen = dropdown.classList.contains("is-open");
      closeAllDropdowns();

      if (!isCurrentlyOpen) {
        dropdown.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    }
  });
});

// --- Click Outside to Close (DESKTOP ONLY) ---
window.addEventListener("click", (event) => {
  if (window.innerWidth > 768) {
    if (!event.target.closest(".nav__item--dropdown")) {
      closeAllDropdowns();
    }
  }
});

// Quantity controls
const qtyMinus = document.getElementById("qtyMinus");
const qtyPlus = document.getElementById("qtyPlus");
const qtyCount = document.getElementById("qtyCount");
let qty = 1;
qtyPlus.addEventListener("click", () => {
  qty = Math.min(99, qty + 1);
  qtyCount.textContent = qty;
});
qtyMinus.addEventListener("click", () => {
  qty = Math.max(1, qty - 1);
  qtyCount.textContent = qty;
});

// Add to cart simple feedback
document.getElementById("addToCart").addEventListener("click", () => {
  const btn = document.getElementById("addToCart");
  btn.textContent = "Added ✓";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = "Add to Cart";
    btn.disabled = false;
  }, 1200);
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();
