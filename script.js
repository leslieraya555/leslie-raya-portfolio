
// Leslie Raya Portfolio — script.js

// AUTOMATIC COPYRIGHT YEAR
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

function closeMenu() {
  if (!menuToggle || !siteNav) return;

  siteNav.classList.remove("open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  // Close the menu when a link is selected.
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close using the Escape key.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Reset mobile navigation on desktop.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMenu();
    }
  });
}

// LIGHT / DARK MODE SWITCHER
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

let savedTheme = null;

try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch (_) {
  // Storage may be unavailable in private browsing.
}

function setTheme(theme) {
  const lightMode = theme === "light";

  root.setAttribute(
    "data-theme",
    lightMode ? "light" : "dark"
  );

  if (themeToggle) {
    themeToggle.textContent = lightMode ? "☾" : "☀";

    themeToggle.setAttribute(
      "aria-label",
      lightMode ? "Switch to dark mode" : "Switch to light mode"
    );

    themeToggle.setAttribute(
      "title",
      lightMode ? "Switch to dark mode" : "Switch to light mode"
    );
  }
}

// Restore the saved theme.
setTheme(savedTheme === "light" ? "light" : "dark");

// Switch the theme when the user clicks the button.
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      root.getAttribute("data-theme") === "light"
        ? "dark"
        : "light";

    setTheme(nextTheme);

    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (_) {
      // Theme remains active for this page.
    }
  });
}
