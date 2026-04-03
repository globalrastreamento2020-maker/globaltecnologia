document.addEventListener("DOMContentLoaded", () => {
  const whatsappNumber = "5575988190527";

  // =========================
  // MENU MOBILE
  // =========================
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedHamburger = hamburger.contains(event.target);

      if (!clickedInsideMenu && !clickedHamburger) {
        navLinks.classList.remove("active");
      }
    });
  }

  // =========================
  // BOTÃO VOLTAR AO TOPO
  // =========================
  const backToTop = document.getElementById("backToTop");

  const toggleBackToTop = () => {
    if (!backToTop) return;

    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };

  window.addEventListener("scroll", toggleBackToTop);
  toggleBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // =========================
  // ANIMAÇÃO AO ENTRAR NA TELA
  // =========================
  const animatedElements = document.querySelectorAll("[data-animate]");

  if ("IntersectionObserver" in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    animatedElements.forEach((el) => el.classList.add("visible"));
  }

  // =========================
  // MÁSCARA DE WHATSAPP
  // =========================
  const whatsappInput = document.getElementById("whatsapp");

  const formatPhone = (value) => {
    let numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length <= 10) {
      numbers = numbers.replace(/^(\d{2})(\d)/g, "($1) $2");
      numbers = numbers.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      numbers = numbers.replace(/^(\d{2})(\d)/g, "($1) $2");
      numbers = numbers.replace(/(\d{5})(\d)/, "$1-$2");
    }

    return numbers;
  };

  if (whatsappInput) {
    whatsappInput.addEventListener("input", (e) => {
      e.target.value = formatPhone(e.target.value);
    });
  }

  // =========================
  // FORMULÁRIO -> WHATSAPP
  // =========================
  const contactForm = document.getElementById("contactForm");

  const setError = (fieldId, message) => {
    const errorEl = document.getElementById(`${fieldId}-error`);
    if (errorEl) errorEl.textContent = message;
  };

  const clearErrors = () => {
    ["nome", "whatsapp", "tipo"].forEach((field) => setError(field, ""));
  };

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      const nome = document.getElementById("nome")?.value.trim() || "";
      const whatsapp = document.getElementById("whatsapp")?.value.trim() || "";
      const tipo = document.getElementById("tipo")?.value || "";
      const mensagem = document.getElementById("mensagem")?.value.trim() || "";

      let hasError = false;

      if (!nome) {
        setError("nome", "Por favor, informe seu nome.");
        hasError = true;
      }

      const whatsappNumbers = whatsapp.replace(/\D/g, "");
      if (!whatsapp || whatsappNumbers.length < 10) {
        setError("whatsapp", "Informe um WhatsApp válido.");
        hasError = true;
      }

      if (!tipo) {
        setError("tipo", "Selecione o tipo de uso.");
        hasError = true;
      }

      if (hasError) return;

      const texto = `
Olá, equipe da Global Rastreamento!

Meu nome é ${nome}.
Meu WhatsApp: ${whatsapp}.
Tipo de uso: ${tipo}.
${mensagem ? `Mensagem: ${mensagem}` : ""}
      `.trim();

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texto)}`;
      window.open(url, "_blank");
    });
  }

  // =========================
  // COOKIES
  // =========================
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("acceptCookies");
  const rejectBtn = document.getElementById("rejectCookies");

  const saveCookieConsent = (status) => {
    localStorage.setItem("cookieConsent", status);
    document.cookie = `cookieConsent=${status}; max-age=31536000; path=/; SameSite=Lax`;

    if (cookieBanner) {
      cookieBanner.classList.remove("show");
    }
  };

  if (cookieBanner) {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
      setTimeout(() => {
        cookieBanner.classList.add("show");
      }, 500);
    }
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => saveCookieConsent("accepted"));
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => saveCookieConsent("rejected"));
  }
});
