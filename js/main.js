document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach((faq) => {
        faq.classList.remove('active');
      });

      if (!isOpen) item.classList.add('active');
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

      portfolioItems.forEach((item) => {
        const category = item.dataset.category;
        const shouldShow = selected === 'all' || category === selected;
        item.classList.toggle('is-hidden', !shouldShow);
      });
    });
  });

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const fields = {
      name: contactForm.querySelector('#name'),
      email: contactForm.querySelector('#email'),
      phone: contactForm.querySelector('#phone'),
      message: contactForm.querySelector('#message')
    };

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;

      Object.entries(fields).forEach(([key, input]) => {
        const errorNode = input.parentElement.querySelector('.field-error');

        if (!input.value.trim()) {
          errorNode.textContent = 'هذا الحقل مطلوب.';
          input.setAttribute('aria-invalid', 'true');
          valid = false;
          return;
        }

        if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
          errorNode.textContent = 'أدخل بريدًا إلكترونيًا صحيحًا.';
          input.setAttribute('aria-invalid', 'true');
          valid = false;
          return;
        }

        if (key === 'phone' && input.value.trim().length < 8) {
          errorNode.textContent = 'أدخل رقم هاتف صحيحًا.';
          input.setAttribute('aria-invalid', 'true');
          valid = false;
          return;
        }

        if (key === 'message' && input.value.trim().length < 10) {
          errorNode.textContent = 'أدخل تفاصيل أكثر تفصيلًا.';
          input.setAttribute('aria-invalid', 'true');
          valid = false;
          return;
        }

        errorNode.textContent = '';
        input.setAttribute('aria-invalid', 'false');
      });

      if (!valid) return;

      const name = fields.name.value.trim();
      const email = fields.email.value.trim();
      const phone = fields.phone.value.trim();
      const message = fields.message.value.trim();
      const service = contactForm.querySelector('#service')?.value || 'خدمة غير محددة';
      const text = `السلام عليكم، أود الاستفسار عن خدمة: ${service}.\nالاسم: ${name}\nالبريد: ${email}\nالهاتف: ${phone}\nالرسالة: ${message}`;

      const whatsappUrl = `https://wa.me/249128520192?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      contactForm.reset();
      const summary = document.createElement('p');
      summary.className = 'form-success';
      summary.textContent = 'تم التحقق من البيانات، وسيتم تحويلك إلى واتساب لإرسال الطلب.';
      const existing = contactForm.querySelector('.form-success');
      if (existing) existing.remove();
      contactForm.appendChild(summary);
    });
  }
});
