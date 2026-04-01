/* ============================================================
   GLOBAL RASTREAMENTO — JavaScript Principal
   ============================================================ */

'use strict';

/* ——— Constantes de seletores ——— */
const header     = document.getElementById('header');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const backToTop  = document.getElementById('backToTop');
const form       = document.getElementById('contactForm');

/* ============================================================
   SCROLL: header + back-to-top
   ============================================================ */
function onScroll() {
  const y = window.scrollY;

  // Header com sombra ao scrollar
  header.classList.toggle('scrolled', y > 20);

  // Botão "voltar ao topo"
  backToTop.classList.toggle('visible', y > 400);
}

window.addEventListener('scroll', onScroll, { passive: true });

// Clique em "voltar ao topo"
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   HAMBÚRGUER (Mobile)
   ============================================================ */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Fecha ao clicar em link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Fecha ao clicar fora
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ============================================================
   ANIMATE ON SCROLL (Intersection Observer)
   ============================================================ */
const animatables = document.querySelectorAll('[data-animate]');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Delay escalonado por posição no DOM
      const siblings = Array.from(entry.target.parentElement.children).filter(el => el.hasAttribute('data-animate'));
      const index = siblings.indexOf(entry.target);
      const delay = Math.min(index * 100, 400);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      io.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

animatables.forEach(el => io.observe(el));

/* ============================================================
   SMOOTH SCROLL para links âncora
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    const offset = 80; // altura do header fixo
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   FORMULÁRIO DE CONTATO — Validação + Envio WhatsApp
   ============================================================ */
function validateField(input) {
  const errorEl = document.getElementById(`${input.id}-error`);
  if (!errorEl) return true;

  let valid = true;
  let msg   = '';

  if (input.required && !input.value.trim()) {
    valid = false;
    msg   = 'Este campo é obrigatório.';
  } else if (input.type === 'tel' && input.value.trim()) {
    const digits = input.value.replace(/\D/g, '');
    if (digits.length < 10) {
      valid = false;
      msg = 'Informe um WhatsApp válido (com DDD).';
    }
  }

  input.classList.toggle('error', !valid);
  errorEl.textContent = msg;
  return valid;
}

// Máscara de telefone
const phoneInput = document.getElementById('whatsapp');
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    let v = phoneInput.value.replace(/\D/g, '').slice(0, 11);
    if (v.length >= 7) {
      v = v.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
    } else if (v.length >= 3) {
      v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (v.length >= 1) {
      v = v.replace(/^(\d{0,2})$/, '($1');
    }
    phoneInput.value = v;
  });
}

// Validação em tempo real (blur)
document.querySelectorAll('#contactForm [required]').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) validateField(input);
  });
});

// Submit
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome      = document.getElementById('nome');
    const whatsapp  = document.getElementById('whatsapp');
    const tipo      = document.getElementById('tipo');
    const mensagem  = document.getElementById('mensagem');

    const allValid = [nome, whatsapp, tipo].every(validateField);
    if (!allValid) return;

    // Monta mensagem WhatsApp
    const tipoLabels = {
      'pessoal':       'Uso pessoal (1 veículo)',
      'pequena-frota': 'Pequena frota (2 a 10 veículos)',
      'frota-media':   'Frota média (11 a 50 veículos)',
      'frota-grande':  'Frota grande (50+ veículos)',
    };

    const tipoTexto = tipoLabels[tipo.value] || tipo.value;
    const msg = mensagem.value.trim();

    let texto = `Olá! Meu nome é *${nome.value.trim()}* e tenho interesse na Global Rastreamento.\n\n`;
    texto += `📱 *Tipo de uso:* ${tipoTexto}\n`;
    texto += `📞 *WhatsApp:* ${whatsapp.value.trim()}\n`;
    if (msg) texto += `\n💬 *Mensagem:* ${msg}`;
    texto += `\n\nAguardo mais informações sobre a solução.`;

    // Número de WhatsApp da empresa — altere aqui
    const numero = '5500000000000';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    // Feedback visual
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<i class="fas fa-check"></i> Redirecionando...';
    btn.disabled = true;

    setTimeout(() => {
      window.open(url, '_blank');
      form.reset();
      btn.innerHTML = '<i class="fab fa-whatsapp"></i> Enviar pelo WhatsApp';
      btn.disabled = false;
    }, 600);
  });
}

/* ============================================================
   CONTADORES (caso queira adicionar futuramente)
   ============================================================ */
function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const step = Math.ceil(duration / target);
  const timer = setInterval(() => {
    start += 1;
    el.textContent = start.toLocaleString('pt-BR');
    if (start >= target) {
      el.textContent = target.toLocaleString('pt-BR') + '+';
      clearInterval(timer);
    }
  }, step);
}

/* ============================================================
   APP MOCKUP — Simulação de atualização de velocidade
   ============================================================ */
const statVals = document.querySelectorAll('.stat-val');
const speeds = [48, 55, 62, 71, 58, 64, 70, 62];
const distances = ['14.3 km', '14.5 km', '14.8 km', '15.1 km', '15.3 km', '15.6 km'];
const times = ['00:23', '00:25', '00:27', '00:29', '00:31'];

let speedIdx = 0, distIdx = 0, timeIdx = 0;

function tickMockup() {
  if (statVals.length < 3) return;

  speedIdx = (speedIdx + 1) % speeds.length;
  distIdx  = (distIdx + 1) % distances.length;
  timeIdx  = (timeIdx + 1) % times.length;

  statVals[0].textContent = speeds[speedIdx] + ' km/h';
  statVals[1].textContent = distances[distIdx];
  statVals[2].textContent = times[timeIdx];
}

setInterval(tickMockup, 3000);

/* ============================================================
   ACTIVE NAV LINK (com scroll)
   ============================================================ */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    if (
      section.offsetTop <= scrollPos &&
      section.offsetTop + section.offsetHeight > scrollPos
    ) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${section.id}`);
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

/* ——— CSS para link ativo ——— */
const styleTag = document.createElement('style');
styleTag.textContent = `.nav-links a.active { color: var(--primary) !important; background: var(--primary-light) !important; }`;
document.head.appendChild(styleTag);

/* ============================================================
   INIT
   ============================================================ */
onScroll();
updateActiveNav();
