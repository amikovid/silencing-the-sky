/* ─── Myth: line-by-line fade in ────────────────────────────────────── */
(function animateMyth() {
  const lines = document.querySelectorAll('.myth-line');
  const FADE_DELAY = 800;   // ms between each line starting to appear
  const INITIAL_DELAY = 600; // ms before the first line appears

  lines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('visible');
    }, INITIAL_DELAY + i * FADE_DELAY);
  });
})();


/* ─── Scroll reveal for hook + capture sections ─────────────────────── */
(function scrollReveal() {
  const targets = document.querySelectorAll('.scroll-reveal');

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
})();


/* ─── Form submission ───────────────────────────────────────────────── */
(function handleForm() {
  const form = document.getElementById('email-form');
  const success = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const action = form.getAttribute('action');

    // If Formspree ID hasn't been set yet, just show the message
    if (action.includes('YOUR_FORM_ID')) {
      showSuccess();
      return;
    }

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        showSuccess();
      } else {
        // Still show success — don't make the reader think about errors
        showSuccess();
      }
    } catch {
      // Same: silent fail, show message
      showSuccess();
    }
  });

  function showSuccess() {
    form.style.transition = 'opacity 0.8s ease';
    form.style.opacity = '0';
    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          success.classList.add('visible');
        });
      });
    }, 800);
  }
})();
