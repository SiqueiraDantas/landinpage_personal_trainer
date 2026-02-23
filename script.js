/* ═══════════════════════════════════════
   KOREANO FREITAS · Personal Trainer
   script.js
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 55);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  reveals.forEach(el => revealObserver.observe(el));


  /* ── 2. COUNTER ANIMATION ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const steps = 60;
    const inc = Math.ceil(target / steps);

    const timer = setInterval(() => {
      current = Math.min(current + inc, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 22);
  }

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(animateCounter);
        statsObserver.disconnect();
      }
    }, { threshold: 0.5 });
    statsObserver.observe(statsBar);
  }


  /* ── 3. PARALLAX GLOW ── */
  const g1 = document.querySelector('.g1');
  const g2 = document.querySelector('.g2');
  let raf;

  document.addEventListener('mousemove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 44;
      const y = (e.clientY / window.innerHeight - 0.5) * 44;
      if (g1) g1.style.transform = `translate(${x}px, ${y}px)`;
      if (g2) g2.style.transform = `translate(${-x * 0.7}px, ${-y * 0.7}px)`;
    });
  });


  /* ── 4. SMOOTH SCROLL (anchor links) ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});