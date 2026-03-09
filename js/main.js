// ====== CURSOR PERSONALIZADO ======
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--cx', e.clientX + 'px')
  document.body.style.setProperty('--cy', e.clientY + 'px')
})

// ====== REVEAL AL HACER SCROLL ======
const revealElements = document.querySelectorAll('.section-tag, .section-title, .section-divider, .sobre-grid, .skills-grid, .projects-grid, .contacto-desc, .contacto-grid, .skill-group, .project-card')

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Delay escalonado para que aparezcan uno por uno
      setTimeout(() => {
        entry.target.classList.add('visible')
      }, i * 80)
      observer.unobserve(entry.target)
    }
  })
}, { threshold: 0.1 })

revealElements.forEach(el => {
  el.classList.add('reveal')
  observer.observe(el)
})

// ====== BARRAS DE HABILIDADES ======
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.classList.add('animated')
        }, i * 150)
      })
      barObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.3 })

document.querySelectorAll('.skill-group').forEach(group => {
  barObserver.observe(group)
})

// ====== NAVBAR: cambia al hacer scroll ======
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.borderBottomColor = 'rgba(200, 131, 42, 0.2)'
  } else {
    navbar.style.borderBottomColor = 'rgba(45, 106, 90, 0.2)'
  }
})

// ====== NAVBAR: resalta sección activa ======
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav-links a')

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active')
        }
      })
    }
  })
}, { threshold: 0.4 })

sections.forEach(section => sectionObserver.observe(section))

// ====== FORMULARIO DE CONTACTO ======
const form = document.getElementById('contactForm')
const formMsg = document.getElementById('formMsg')

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const btn = form.querySelector('button[type="submit"]')
    btn.textContent = 'Enviando...'
    btn.disabled = true

    const data = {
      nombre:  form.nombre.value,
      email:   form.email.value,
      mensaje: form.mensaje.value,
    }

    try {
      const res = await fetch('/contacto/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      formMsg.textContent = json.mensaje
      if (json.success) form.reset()
    } catch (err) {
      formMsg.textContent = 'Error de conexión. Intenta de nuevo.'
    } finally {
      btn.textContent = 'Enviar mensaje ✦'
      btn.disabled = false
    }
  })
}

// ====== SMOOTH SCROLL para nav links ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

// ====== CURSOR TERMINAL ESCRITURA ======
document.addEventListener('DOMContentLoaded', () => {
  const terminalCursor = document.getElementById('terminalCursor');
  if (!terminalCursor) return;

  const textos = [
    'Ampliando mis habilidades...',
    'Aprendiendo cada día...',
    'Construyendo el futuro...'
  ];

  let textoIndex = 0;
  let charIndex = 0;
  let escribiendo = true;

  function tick() {
    const texto = textos[textoIndex];

    if (escribiendo) {
      charIndex++;
      terminalCursor.innerHTML = texto.slice(0, charIndex) + '<span class="t-cursor-blink">▋</span>';
      if (charIndex >= texto.length) {
        escribiendo = false;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 80);
    } else {
      charIndex--;
      terminalCursor.innerHTML = texto.slice(0, charIndex) + '<span class="t-cursor-blink">▋</span>';
      if (charIndex <= 0) {
        escribiendo = true;
        textoIndex = (textoIndex + 1) % textos.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 35);
    }
  }

  tick();
});

// ====== BOTÓN SUBIR + HOJITAS ======
document.addEventListener('DOMContentLoaded', () => {
  const btnSubir = document.getElementById('btnSubir');
  if (!btnSubir) return;

  const hojas = ['🍃', '🍂', '🌿', '🍁'];

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btnSubir.classList.add('visible');
    } else {
      btnSubir.classList.remove('visible');
    }
  });

  function lanzarHojas() {
    const rect = btnSubir.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const hoja = document.createElement('span');
        hoja.classList.add('hoja-flotante');
        hoja.textContent = hojas[Math.floor(Math.random() * hojas.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 120;
        hoja.style.cssText = `
          left: ${cx}px;
          top: ${cy}px;
          --dx: ${Math.cos(angle) * dist}px;
          --dy: ${Math.sin(angle) * dist - 100}px;
          font-size: ${0.8 + Math.random() * 0.7}rem;
        `;
        document.body.appendChild(hoja);
        setTimeout(() => hoja.remove(), 2000);
      }, i * 80);
    }
  }

  btnSubir.addEventListener('click', () => {
    lanzarHojas();
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 300);
  });
});