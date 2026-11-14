/**
 * FOREX ACADEMY — CORE CLIENT SCRIPT (PRODUCTION ENGINE)
 * Vanilla JavaScript (Zero external libraries, Zero build dependencies)
 * Deployable statically to Vercel
 */

// ==========================================================================
// 1. PRODUCTION CONFIGURATION OBJECT
// ==========================================================================
// Update these values to configure your academy before deployment.
// ==========================================================================

const CONFIG = {
  // Institutional name displayed across all pages and footers
  academyName: "FOREX ACADEMY",

  // EXTERNALLY HOSTED REGISTRATION FORM URL:
  // Paste your live Tally.so or Google Forms share link here.
  // Example (Tally):       "https://tally.so/r/3yVwPO"
  // Example (Google Form): "https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform"
  // If left empty (""), the website safely displays a transparent Setup Notice
  // and will NOT simulate a fake registration.
  registrationUrl: "",

  // EMBED MODE:
  // Set to true to embed your Tally or Google Form directly inside the webpage.
  // Set to false to use the native application portal with external redirection.
  embedForm: false,

  // Admissions Desk WhatsApp Number (include country code e.g. +234 for Nigeria)
  whatsappNumber: "+23408144784467",

  // Admissions Desk Official Email Address
  contactEmail: "Mayormontechris@gmail.com",

  // Upcoming Cohort Start Date displayed across headers & badges
  cohortStartDate: "First Monday of Next Month",

  // Tuition or enrollment fee indicator
  courseFee: "₦200,000 (All 4 Weeks Included)",

  // Program delivery format
  classFormat: "Online & Physical"
};

// ==========================================================================
// 2. DOM INITIALIZATION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initDynamicConfig();
  initHeaderScroll();
  initMobileNav();
  initSmoothScroll();
  initFaqAccordion();
  initRegistrationForm();
  initCopyrightYear();
});

// ==========================================================================
// 3. DYNAMIC CONFIGURATION BINDING
// ==========================================================================

function initDynamicConfig() {
  // Bind Academy Name
  document.querySelectorAll("[data-config='academyName']").forEach(el => {
    el.textContent = CONFIG.academyName;
  });

  // Bind Cohort Date
  document.querySelectorAll("[data-config='cohortStartDate']").forEach(el => {
    el.textContent = CONFIG.cohortStartDate;
  });

  // Bind Tuition Fee
  document.querySelectorAll("[data-config='courseFee']").forEach(el => {
    el.textContent = CONFIG.courseFee;
  });

  // Bind Delivery Format
  document.querySelectorAll("[data-config='classFormat']").forEach(el => {
    el.textContent = CONFIG.classFormat;
  });

  // Bind WhatsApp Direct Link
  const cleanPhone = getCleanWhatsAppPhone(CONFIG.whatsappNumber);
  const defaultMessage = encodeURIComponent(
    `Hello ${CONFIG.academyName} Admissions, I am inquiring about the upcoming 4-Week Beginner Training Program.`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  document.querySelectorAll("[data-config='whatsappLink']").forEach(el => {
    el.setAttribute("href", waUrl);
  });

  document.querySelectorAll("[data-config='whatsappDisplay']").forEach(el => {
    el.textContent = CONFIG.whatsappNumber;
  });

  // Bind Admissions Email
  document.querySelectorAll("[data-config='contactEmail']").forEach(el => {
    el.setAttribute("href", `mailto:${CONFIG.contactEmail}`);
    el.textContent = CONFIG.contactEmail;
  });
}

// ==========================================================================
// 4. STICKY HEADER & SCROLL BEHAVIOR
// ==========================================================================

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// ==========================================================================
// 5. MOBILE NAVIGATION DRAWER
// ==========================================================================

function initMobileNav() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const drawer = document.querySelector(".mobile-nav-drawer");
  const backdrop = document.querySelector(".mobile-nav-backdrop");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add("is-open");
    backdrop.classList.add("is-visible");
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("is-open");
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener("click", closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
      toggleBtn.focus();
    }
  });
}

// ==========================================================================
// 6. SMOOTH SCROLLING WITH STICKY HEADER OFFSET
// ==========================================================================

function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  const headerHeight = 84;

  internalLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        targetEl.setAttribute("tabindex", "-1");
        targetEl.focus({ preventScroll: true });
      }
    });
  });
}

// ==========================================================================
// 7. FAQ ACCORDION
// ==========================================================================

function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question-btn");
    const answerPanel = item.querySelector(".faq-answer-panel");

    if (!questionBtn || !answerPanel) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-active");

      // Close other accordion panels for clean reading
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains("is-active")) {
          otherItem.classList.remove("is-active");
          const btn = otherItem.querySelector(".faq-question-btn");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("is-active");
        questionBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-active");
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ==========================================================================
// 8. REGISTRATION & EXTERNAL FORM INTEGRATION (TALLY / GOOGLE FORMS)
// ==========================================================================
// Features:
// - Never stores student data in browser (no localStorage, sessionStorage, cookies).
// - Never requests or collects sensitive credentials (no passwords, OTP, BVN, NIN, broker logins).
// - Supports both Native Embed (iframe) and Native Forwarding modes.
// - Transparent Setup Notice when no external endpoint is configured.
// ==========================================================================

function initRegistrationForm() {
  const formCard = document.querySelector(".registration-card");
  const form = document.getElementById("student-registration-form");
  const alertNotice = document.getElementById("form-alert-notice");
  const alertTitle = document.getElementById("alert-notice-title");
  const alertBody = document.getElementById("alert-notice-body");
  const alertActions = document.getElementById("alert-notice-actions");

  if (!formCard || !form) return;

  const isUrlConfigured = CONFIG.registrationUrl && 
                         CONFIG.registrationUrl.trim() !== "" && 
                         CONFIG.registrationUrl.startsWith("http");

  // NATIVE EMBED MODE (If embedForm is true and a URL is provided)
  if (CONFIG.embedForm && isUrlConfigured) {
    renderEmbeddedForm(formCard, CONFIG.registrationUrl);
    return;
  }

  // Clear errors in real-time as user types
  form.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("input", () => clearFieldError(field));
    field.addEventListener("change", () => clearFieldError(field));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. Validate Form Fields
    const isValid = validateRegistrationForm(form);
    if (!isValid) {
      const firstInvalid = form.querySelector(".has-error input, .has-error select");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // 2. Extract values (held strictly in memory; never stored in localStorage/cookies)
    const formData = {
      fullName: form.querySelector("#full-name").value.trim(),
      email: form.querySelector("#email-address").value.trim(),
      phone: form.querySelector("#whatsapp-number").value.trim(),
      location: form.querySelector("#city-state").value.trim(),
      experience: form.querySelector('input[name="forex_experience"]:checked')?.value || "Beginner",
      device: form.querySelector("#device-type").value,
      trainingFormat: form.querySelector("#training-format").value,
      schedule: form.querySelector("#preferred-schedule").value
    };

    // 3. Handle External Integration
    if (!isUrlConfigured) {
      // SETUP NOTICE: Honest notification that no external form endpoint has been set
      displaySetupNotice(formData, alertNotice, alertTitle, alertBody, alertActions);
    } else {
      // DIRECT FORWARDING: Open external form (Tally or Google Forms) with prefilled params
      displayRedirectNotice(formData, CONFIG.registrationUrl, alertNotice, alertTitle, alertBody, alertActions);
    }

    if (alertNotice) {
      alertNotice.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

/**
 * Validates inputs, emails, Nigerian & international phone numbers, and consents.
 */
function validateRegistrationForm(form) {
  let valid = true;

  const validateField = (inputEl, condition, errorMessage) => {
    const parentGroup = inputEl.closest(".form-group");
    if (!parentGroup) return true;

    const errorEl = parentGroup.querySelector(".form-error");

    if (!condition) {
      parentGroup.classList.add("has-error");
      if (errorEl) errorEl.textContent = errorMessage;
      valid = false;
      return false;
    } else {
      parentGroup.classList.remove("has-error");
      return true;
    }
  };

  // Full Name (minimum 3 characters)
  const fullName = form.querySelector("#full-name");
  validateField(
    fullName,
    fullName.value.trim().length >= 3,
    "Please enter your full legal name (at least 3 characters)."
  );

  // Email Address
  const email = form.querySelector("#email-address");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  validateField(
    email,
    emailRegex.test(email.value.trim()),
    "Please enter a valid email address (e.g. name@domain.com)."
  );

  // WhatsApp Phone Number (Nigerian & International formats)
  const phone = form.querySelector("#whatsapp-number");
  const phoneVal = phone.value.replace(/[\s-]/g, "");
  const nigerianRegex = /^(?:\+234|234|0)(?:70|80|81|90|91|71)\d{8}$/;
  const generalPhoneRegex = /^\+?[1-9]\d{7,14}$/;

  const isPhoneValid = nigerianRegex.test(phoneVal) || generalPhoneRegex.test(phoneVal);
  validateField(
    phone,
    isPhoneValid,
    "Please enter a valid phone number (e.g. 08012345678 or +234 801 234 5678)."
  );

  // State / City of Residence
  const cityState = form.querySelector("#city-state");
  validateField(
    cityState,
    cityState.value.trim().length >= 2,
    "Please specify your state or city of residence."
  );

  // Age Confirmation
  const ageConfirm = form.querySelector("#age-confirmation");
  validateField(
    ageConfirm,
    ageConfirm.checked,
    "You must confirm that you are at least 18 years of age to register."
  );

  // Experience Level
  const expSelected = form.querySelector('input[name="forex_experience"]:checked');
  const expGroup = form.querySelector("#experience-group");
  if (!expSelected && expGroup) {
    expGroup.classList.add("has-error");
    valid = false;
  } else if (expGroup) {
    expGroup.classList.remove("has-error");
  }

  // Device Type
  const deviceType = form.querySelector("#device-type");
  validateField(
    deviceType,
    deviceType.value !== "",
    "Please select the primary device you will use for training."
  );

  // Training Format
  const trainingFormat = form.querySelector("#training-format");
  validateField(
    trainingFormat,
    trainingFormat.value !== "",
    "Please select your preferred training format (Online, Physical, or Hybrid)."
  );

  // Preferred Schedule
  const schedule = form.querySelector("#preferred-schedule");
  validateField(
    schedule,
    schedule.value !== "",
    "Please select your preferred class schedule."
  );

  // Mandatory Consents
  const consentAccuracy = form.querySelector("#consent-accuracy");
  validateField(consentAccuracy, consentAccuracy.checked, "Please confirm that your information is accurate.");

  const consentRisk = form.querySelector("#consent-risk");
  validateField(consentRisk, consentRisk.checked, "Please confirm that Forex trading involves financial risk.");

  const consentNoProfit = form.querySelector("#consent-no-profit");
  validateField(consentNoProfit, consentNoProfit.checked, "Please confirm that training does not guarantee profits.");

  const consentContact = form.querySelector("#consent-contact");
  validateField(consentContact, consentContact.checked, "Please consent to be contacted regarding registration.");

  return valid;
}

function clearFieldError(field) {
  const parentGroup = field.closest(".form-group");
  if (parentGroup) {
    parentGroup.classList.remove("has-error");
  }
}

/**
 * Renders an embedded external form (Tally or Google Forms) inside the native portal.
 */
function renderEmbeddedForm(container, formUrl) {
  container.innerHTML = `
    <div style="margin-bottom: var(--space-4);">
      <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: var(--color-text-primary); margin-bottom: var(--space-2);">
        Official Cohort Admissions Application
      </h3>
      <p style="font-size: 0.875rem; color: var(--color-text-muted);">
        Complete the official form below. Your application is securely processed through our admissions service.
      </p>
    </div>
    <div style="position: relative; width: 100%; min-height: 640px; border-radius: var(--radius-md); overflow: hidden; background: #0A1322; border: 1px solid var(--color-border);">
      <iframe 
        src="${escapeHtml(formUrl)}" 
        width="100%" 
        height="640" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0" 
        title="Student Registration Form"
        loading="lazy"
        style="border: none; display: block;">
        Loading admissions form...
      </iframe>
    </div>
    <div style="margin-top: var(--space-4); text-align: center;">
      <a href="${escapeHtml(formUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
        Open Form in Full Window &rarr;
      </a>
    </div>
  `;
}

/**
 * Transparent Setup Notice when no external endpoint has been configured.
 * Strictly avoids simulating a fake submission.
 */
function displaySetupNotice(data, alertNotice, alertTitle, alertBody, alertActions) {
  if (!alertNotice) return;

  alertNotice.className = "alert-notice alert-notice-warning is-active";
  
  alertTitle.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
    Setup Notice: External Registration Service Link Required
  `;

  const cleanPhone = getCleanWhatsAppPhone(CONFIG.whatsappNumber);
  const waPreText = encodeURIComponent(
    `Hello Admissions, I have completed the registration requirements on the website.\n\n` +
    `• Name: ${data.fullName}\n` +
    `• Email: ${data.email}\n` +
    `• Phone: ${data.phone}\n` +
    `• Location: ${data.location}\n` +
    `• Experience: ${data.experience}\n` +
    `• Format: ${data.trainingFormat}\n` +
    `• Schedule: ${data.schedule}\n\n` +
    `Please assist me with confirming my enrollment.`
  );
  const waUrl = `https://wa.me/${cleanPhone}?text=${waPreText}`;

  alertBody.innerHTML = `
    <p>
      <strong>Notice for Student & Academy Administrator:</strong><br>
      Your application details were validated. However, this static website has not yet been linked to a live Tally or Google Forms endpoint.
      <strong>No registration was stored on a server</strong> because no backend exists by design.
    </p>
    <p>
      <strong>To Administrator:</strong> Insert your live Tally.so or Google Forms link into <code>CONFIG.registrationUrl</code> in <code>script.js</code>.
    </p>
    <p>
      <strong>To Student (${escapeHtml(data.fullName)}):</strong> You can immediately submit your details directly to our Admissions Desk via WhatsApp:
    </p>
  `;

  alertActions.innerHTML = `
    <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      Forward Application via WhatsApp
    </a>
    <a href="mailto:${CONFIG.contactEmail}?subject=Cohort%20Application%20-%20${encodeURIComponent(data.fullName)}" class="btn btn-secondary btn-sm">
      Email Admissions Desk
    </a>
  `;
}

/**
 * Handles redirecting to an external form service (Tally, Google Forms) when configured.
 */
function displayRedirectNotice(data, externalUrl, alertNotice, alertTitle, alertBody, alertActions) {
  if (!alertNotice) return;

  alertNotice.className = "alert-notice alert-notice-success is-active";

  alertTitle.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    Redirecting to Official Admissions Portal...
  `;

  let targetUrl = externalUrl;
  try {
    const parsedUrl = new URL(externalUrl);
    // Prefill name, email, and phone where supported by form providers
    parsedUrl.searchParams.set("name", data.fullName);
    parsedUrl.searchParams.set("email", data.email);
    parsedUrl.searchParams.set("phone", data.phone);
    targetUrl = parsedUrl.toString();
  } catch (e) {
    targetUrl = externalUrl;
  }

  alertBody.innerHTML = `
    <p>
      Thank you, <strong>${escapeHtml(data.fullName)}</strong>. Your application details have been verified.
      You are now being transferred to our official admissions form service to finalize your placement.
    </p>
    <p>
      <strong>What happens after submission:</strong> You will receive an official confirmation on the form, followed by an admissions offer and orientation guide via email and WhatsApp within 24 business hours.
    </p>
  `;

  alertActions.innerHTML = `
    <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
      Open Official Application Form &rarr;
    </a>
    <a href="confirmation.html" class="btn btn-secondary btn-sm">
      View Next Steps & Orientation
    </a>
  `;

  // Safe window open in new tab
  setTimeout(() => {
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }, 1400);
}

// ==========================================================================
// 9. DYNAMIC COPYRIGHT YEAR
// ==========================================================================

function initCopyrightYear() {
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Security sanitization helper
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Normalizes international and Nigerian phone numbers for direct wa.me URLs
function getCleanWhatsAppPhone(rawPhone) {
  let clean = rawPhone.replace(/[^0-9]/g, "");
  // Handles Nigerian numbers entered as +2340814... by removing the redundant 0 after 234
  if (clean.startsWith("2340") && clean.length === 14) {
    clean = "234" + clean.slice(4);
  } else if (clean.startsWith("0") && clean.length === 11) {
    clean = "234" + clean.slice(1);
  }
  return clean;
}
