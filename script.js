
/* ===============================
   AIAnchor – Main Site Script
   =============================== */

document.addEventListener('DOMContentLoaded', () => {
  /* -------------------------------
     Mobile menu toggle
  --------------------------------*/
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  /* -------------------------------
     Smooth scrolling for nav links
  --------------------------------*/
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const top = target.offsetTop - headerHeight;

      window.scrollTo({ top, behavior: 'smooth' });

      // close mobile menu if open
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  });

  /* -------------------------------
     Contact form handling
  --------------------------------*/
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  // === Zoho Flow webhook (your URL) ===
  const ZOHO_FLOW_WEBHOOK =
    "https://flow.zoho.eu/20108451502/flow/webhook/incoming?zapikey=1001.6852a77a4e7cd857efd274c55bd5a711.19facefdd4557bf7a90eb2e64abe8950&isdebug=false";

  // Fire-and-forget forwarder to Zoho Flow
  function forwardToZoho(formData) {
    const payload = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      company: formData.get('company') || '',
      phone: formData.get('phone') || '',
      message: formData.get('message') || '',
      source: 'AIAnchor Website',
      submittedAt: new Date().toISOString()
    };

    fetch(ZOHO_FLOW_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {
      // don't block UX if Zoho Flow is unreachable
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      // Basic validation
      const name = formData.get('name')?.trim();
      const email = formData.get('email')?.trim();
      const company = formData.get('company')?.trim();
      const message = formData.get('message')?.trim();

      if (!name || !email || !company || !message) {
        return showError('Please fill in all required fields.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return showError('Please enter a valid email address.');
      }

      // Send to Zoho Flow (auto-reply + CRM, etc.)
      forwardToZoho(formData);

      // Submit to Formspree (keeps your current pipeline)
      fetch('https://formspree.io/f/xnnzezlo', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(res => {
        if (!res.ok) throw new Error('Form submission failed');
        showSuccess();
      })
      .catch(() => showError('Oops, something went wrong. Please try again.'));
    });
  }

  function showSuccess() {
    if (contactForm) contactForm.style.display = 'none';
    if (formError) formError.style.display = 'none';
    if (formSuccess) {
      formSuccess.style.display = 'block';
      contactForm?.reset();
      formSuccess.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function showError(message) {
    if (!formError) return;
    const p = formError.querySelector('p');
    if (p) p.textContent = message || 'Something went wrong.';
    formSuccess && (formSuccess.style.display = 'none');
    formError.style.display = 'block';
    formError.scrollIntoView({ behavior: 'smooth' });
  }

  /* -------------------------------
     Header scroll effect
  --------------------------------*/
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    if (y > 100) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');
  });

  /* -------------------------------
     Intersection Observer animations
  --------------------------------*/
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-in');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.step-card, .benefit-item, .testimonial-card')
    .forEach(el => observer.observe(el));

  // Page loaded fade-in
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});

/* ---------------------------------
   Public helper: scroll to contact
----------------------------------*/
function scrollToContact() {
  const section = document.getElementById('contact');
  if (!section) return;
  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
  const top = section.offsetTop - headerHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ---------------------------------
   Small inline styles for effects
----------------------------------*/
const style = document.createElement('style');
style.textContent = `
  .header.scrolled {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
  }
  .nav.active {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0; right: 0;
    background: #fff;
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  }
  .mobile-menu-toggle.active span:nth-child(1){ transform: rotate(45deg) translate(5px,5px); }
  .mobile-menu-toggle.active span:nth-child(2){ opacity: 0; }
  .mobile-menu-toggle.active span:nth-child(3){ transform: rotate(-45deg) translate(7px,-6px); }

  .step-card, .benefit-item, .testimonial-card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }
  .step-card.animate-in, .benefit-item.animate-in, .testimonial-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  body:not(.loaded){ opacity: 0; }
  body.loaded{ opacity: 1; transition: opacity 0.5s ease; }

  @media (max-width: 768px) {
    .nav { display: none; }
    .nav.active { display: flex; }
  }
`;
document.head.appendChild(style);


