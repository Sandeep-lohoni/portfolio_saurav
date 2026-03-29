const body = document.body;
const header = document.getElementById("header");
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");
const themeButton = document.getElementById("theme-button");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const scrollUpButton = document.getElementById("scroll-up");

const openMenu = () => {
  navMenu?.classList.add("show-menu");
  body.classList.add("menu-open");
  navToggle?.setAttribute("aria-expanded", "true");
};

const closeMenu = () => {
  navMenu?.classList.remove("show-menu");
  body.classList.remove("menu-open");
  navToggle?.setAttribute("aria-expanded", "false");
};

navToggle?.addEventListener("click", openMenu);
navClose?.addEventListener("click", closeMenu);
navLinks.forEach((link) => link.addEventListener("click", closeMenu));

const skillsContent = document.querySelectorAll(".skills__content");
const skillsHeaders = document.querySelectorAll(".skills__header");

skillsHeaders.forEach((headerElement) => {
  headerElement.addEventListener("click", () => {
    const parent = headerElement.parentElement;
    const isOpen = parent?.classList.contains("skills__open");

    skillsContent.forEach((item) => {
      item.classList.remove("skills__open");
      item.classList.add("skills__close");
    });

    if (!isOpen && parent) {
      parent.classList.remove("skills__close");
      parent.classList.add("skills__open");
    }
  });
});

const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((content) => {
      content.classList.remove("qualification__active");
    });

    tabs.forEach((item) => {
      item.classList.remove("qualification__active");
    });

    target?.classList.add("qualification__active");
    tab.classList.add("qualification__active");
  });
});

const modalViews = document.querySelectorAll(".services__modal");
const modalButtons = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

const openModal = (index) => modalViews[index]?.classList.add("active-modal");
const closeModals = () =>
  modalViews.forEach((modal) => modal.classList.remove("active-modal"));

modalButtons.forEach((button, index) => {
  button.addEventListener("click", () => openModal(index));
});

modalCloses.forEach((button) => button.addEventListener("click", closeModals));

modalViews.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModals();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModals();
});

const sections = document.querySelectorAll("section[id]");

const updateScrollState = () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120;
    const sectionId = section.getAttribute("id");
    const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

    if (!link) return;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });

  header?.classList.toggle("scroll-header", scrollY >= 30);
  scrollUpButton?.classList.toggle("show-scroll", scrollY >= 500);
};

window.addEventListener("scroll", updateScrollState);
updateScrollState();

const setThemeIcon = () => {
  const icon = themeButton?.querySelector("i");
  const isDark = body.classList.contains("dark-theme");

  if (icon) {
    icon.className = isDark ? "uil uil-sun" : "uil uil-moon";
  }

  if (themeMeta) {
    themeMeta.setAttribute("content", isDark ? "#07111f" : "#0f172a");
  }
};

const selectedTheme = localStorage.getItem("selected-theme");

if (selectedTheme === "dark") {
  body.classList.add("dark-theme");
}

setThemeIcon();

themeButton?.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  localStorage.setItem(
    "selected-theme",
    body.classList.contains("dark-theme") ? "dark" : "light"
  );
  setThemeIcon();
});

const typingTarget = document.getElementById("typing-text");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const typingWords = [
  "brand identities.",
  "social campaigns.",
  "logo systems.",
  "visual stories.",
];

if (typingTarget) {
  if (reducedMotion.matches) {
    typingTarget.textContent = typingWords[0];
  } else {
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = typingWords[wordIndex];
      const visibleWord = currentWord.slice(0, letterIndex);
      typingTarget.textContent = visibleWord;

      if (!isDeleting && letterIndex < currentWord.length) {
        letterIndex += 1;
        setTimeout(type, 95);
        return;
      }

      if (!isDeleting && letterIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1300);
        return;
      }

      if (isDeleting && letterIndex > 0) {
        letterIndex -= 1;
        setTimeout(type, 55);
        return;
      }

      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      setTimeout(type, 220);
    };

    type();
  }
}

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
  if (reducedMotion.matches) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }
}

const filterButtons = document.querySelectorAll(".work__filter");
const workCards = document.querySelectorAll(".work__card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active-filter"));
    button.classList.add("active-filter");

    workCards.forEach((card) => {
      const matches =
        filter === "all" || card.dataset.category === filter;
      card.hidden = !matches;
    });
  });
});

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

const validators = {
  name: (value) =>
    value.trim().length >= 2 ? "" : "Please enter at least 2 characters.",
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ? ""
      : "Please enter a valid email address.",
  phone: (value) =>
    /^[\d+\-\s()]{7,}$/.test(value.trim())
      ? ""
      : "Please enter a valid phone or WhatsApp number.",
  message: (value) =>
    value.trim().length >= 20
      ? ""
      : "Please add a short project description of at least 20 characters.",
};

const setFieldError = (field, message) => {
  const wrapper = field.closest(".contact__content");
  const errorElement = wrapper?.querySelector(".contact__error");

  wrapper?.classList.toggle("has-error", Boolean(message));

  if (errorElement) {
    errorElement.textContent = message;
  }
};

const validateField = (field) => {
  const validator = validators[field.name];
  if (!validator) return true;

  const message = validator(field.value);
  setFieldError(field, message);
  return message === "";
};

contactForm?.querySelectorAll(".contact__input").forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.closest(".contact__content")?.classList.contains("has-error")) {
      validateField(field);
    }
  });
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fields = [...contactForm.querySelectorAll(".contact__input")];
  const isValid = fields.every((field) => validateField(field));

  if (!isValid) {
    contactStatus.textContent = "Please fix the highlighted fields before sending.";
    contactStatus.className = "contact__status is-error";
    return;
  }

  contactStatus.textContent = "Sending your message...";
  contactStatus.className = "contact__status";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    contactForm.reset();
    contactStatus.textContent = "Thanks, your message has been sent successfully.";
    contactStatus.className = "contact__status is-success";
    contactForm
      .querySelectorAll(".contact__content")
      .forEach((item) => item.classList.remove("has-error"));
    contactForm
      .querySelectorAll(".contact__error")
      .forEach((item) => (item.textContent = ""));
  } catch (error) {
    contactStatus.textContent =
      "Something went wrong while sending. Please try again in a moment.";
    contactStatus.className = "contact__status is-error";
  }
});
