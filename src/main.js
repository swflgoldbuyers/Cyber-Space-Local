import "./styles/main.css";
import { site } from "./data/site.js";

document.body.classList.add("js-ready");

applySiteConfig();
initHeader();
initMobileNav();
initSectionObserver();
initReveals();
initForm();
initHashOffset();

function applySiteConfig() {
  const websitePrice = document.querySelector('[data-price="website"]');
  const websiteCadence = document.querySelector('[data-cadence="website"]');
  const managementPrice = document.querySelector('[data-price="management"]');
  const managementCadence = document.querySelector('[data-cadence="management"]');

  if (websitePrice) websitePrice.textContent = site.pricing.website.display;
  if (websiteCadence) websiteCadence.textContent = site.pricing.website.cadence;
  if (managementPrice) managementPrice.textContent = site.pricing.management.display;
  if (managementCadence) managementCadence.textContent = site.pricing.management.cadence;

  if (!site.logo.showWordmark) {
    document.querySelectorAll(".brand-wordmark").forEach((el) => {
      el.hidden = true;
    });
    document.querySelectorAll(".brand-mark").forEach((img) => {
      img.alt = site.name;
    });
  }

  site.portfolio.forEach((item) => {
    const card = document.querySelector(`[data-portfolio="${item.id}"]`);
    if (!card) return;
    const link = card.querySelector("[data-portfolio-link]");
    const note = card.querySelector("[data-portfolio-note]");
    const url = (item.url || "").trim();

    if (!link) return;

    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");
      if (note) note.hidden = true;
    } else {
      link.href = "#work";
      link.setAttribute("aria-disabled", "true");
      link.tabIndex = -1;
      link.addEventListener("click", (event) => event.preventDefault());
    }
  });
}

function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initMobileNav() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-mobile-nav]");
  if (!header || !toggle || !panel) return;

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("is-open"));
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) setOpen(false);
  });
}

function initSectionObserver() {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.toggleAttribute("aria-current", link.getAttribute("href") === id);
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initReveals() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  if (reduce) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

function initForm() {
  const form = document.querySelector("#preview-form");
  if (!form) return;

  const errorEl = form.querySelector("[data-form-error]");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors(form, errorEl);

    const data = Object.fromEntries(new FormData(form).entries());
    if (data.company_website) {
      form.classList.add("is-success");
      return;
    }

    const issues = validate(data);
    if (issues.length) {
      issues.forEach(({ name }) => {
        const field = form.querySelector(`[name="${name}"]`);
        if (field) field.setAttribute("aria-invalid", "true");
      });
      if (errorEl) {
        errorEl.hidden = false;
        errorEl.textContent = issues[0].message;
      }
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      if (site.formEndpoint) {
        const payload = {
          name: data.name.trim(),
          business: data.business.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
          website: (data.website || "").trim(),
          type: data.type.trim(),
          city: data.city.trim(),
          help: data.help,
        };
        const response = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Request failed");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 450));
      }
      form.classList.add("is-success");
    } catch {
      if (errorEl) {
        errorEl.hidden = false;
        errorEl.textContent = "Something went wrong. Please try again in a moment.";
      }
      submitBtn.disabled = false;
      submitBtn.textContent = "Get My Free Website Preview";
    }
  });
}

function validate(data) {
  const issues = [];
  if (!data.name?.trim()) issues.push({ name: "name", message: "Please add your name." });
  if (!data.business?.trim()) issues.push({ name: "business", message: "Please add your business name." });
  if (!data.phone?.trim()) issues.push({ name: "phone", message: "Please add a phone number." });
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    issues.push({ name: "email", message: "Please add a valid email address." });
  }
  if (!data.type?.trim()) issues.push({ name: "type", message: "Please tell us what type of business you run." });
  if (!data.city?.trim()) issues.push({ name: "city", message: "Please add a city or service area." });
  if (!data.help) issues.push({ name: "help", message: "Please choose what you want help with." });
  if (data.website?.trim()) {
    try {
      const url = new URL(data.website.trim());
      if (!/^https?:$/.test(url.protocol)) throw new Error("bad protocol");
    } catch {
      issues.push({ name: "website", message: "Enter a full website URL, or leave it blank." });
    }
  }
  return issues;
}

function clearErrors(form, errorEl) {
  form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  if (errorEl) {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }
}

function initHashOffset() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) target.setAttribute("tabindex", "-1");
    });
  });
}
