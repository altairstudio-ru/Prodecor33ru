function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  let cleaned = digits;
  if (cleaned.startsWith('8') && cleaned.length > 1) cleaned = '7' + cleaned.slice(1);
  else if (!cleaned.startsWith('7') && cleaned.length > 0) cleaned = '7' + cleaned;
  cleaned = cleaned.slice(0, 11);

  let result = '+';
  if (cleaned.length > 0) result += cleaned[0];
  if (cleaned.length > 1) result += ' (' + cleaned.slice(1, 4);
  if (cleaned.length >= 4) result += ')';
  if (cleaned.length > 4) result += ' ' + cleaned.slice(4, 7);
  if (cleaned.length > 7) result += '-' + cleaned.slice(7, 9);
  if (cleaned.length > 9) result += '-' + cleaned.slice(9, 11);

  return result;
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('7');
}

function toast(message: string, type: 'success' | 'error' = 'success'): void {
  const toaster = document.querySelector<HTMLElement>('[data-toaster]');
  if (!toaster) return;

  const toast = document.createElement('div');
  toast.className = [
    'pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg text-sm shadow-lg border transition-opacity duration-300 max-w-full',
    type === 'success' ? 'bg-[#1F1F1F] text-white border-[#2A2A2A]' : 'bg-[#3c1f1f] text-white border-[#6b2a2a]',
  ].join(' ');

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.classList.add('w-5', 'h-5', 'flex-shrink-0', 'mt-0.5', type === 'success' ? 'text-[#C6A96B]' : 'text-red-400');
  svg.innerHTML =
    type === 'success'
      ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />'
      : '<circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />';

  const text = document.createElement('span');
  text.textContent = message;

  toast.appendChild(svg);
  toast.appendChild(text);
  toaster.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

declare global {
  interface Window {
    __prodecorToast?: (message: string, type?: 'success' | 'error') => void;
  }
}
window.__prodecorToast = toast;

// --- Mobile menu ---
function initMobileMenu(): void {
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!menu || menu.dataset.menuInit === '1') return;
  menu.dataset.menuInit = '1';

  const openButtons = document.querySelectorAll<HTMLElement>('[data-menu-open]');
  const closeButtons = document.querySelectorAll<HTMLElement>('[data-menu-close]');
  let prevOverflow = '';

  function openMenu(): void {
    if (menu.classList.contains('flex')) return;
    menu.classList.remove('hidden');
    menu.classList.add('flex');
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  function closeMenu(): void {
    if (!menu.classList.contains('flex')) return;
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    document.body.style.overflow = prevOverflow;
  }

  openButtons.forEach((btn) => btn.addEventListener('click', openMenu));
  closeButtons.forEach((btn) => btn.addEventListener('click', closeMenu));

  // Services tree toggle
  menu.querySelectorAll<HTMLElement>('[data-tree-toggle]').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      const icon = toggle.querySelector('[data-tree-icon]');
      if (icon) icon.classList.toggle('rotate-180', !expanded);
      const wrapper = toggle.parentElement;
      const content = wrapper?.querySelector<HTMLElement>('[data-tree-content]');
      if (content) content.classList.toggle('hidden', expanded);
    });
  });
}

// --- Consultation modal ---
function initConsultationModal(): void {
  const modal = document.querySelector<HTMLElement>('[data-consultation-modal]');
  if (!modal || modal.dataset.modalInit === '1') return;
  modal.dataset.modalInit = '1';

  let prevOverflow = '';

  function openModal(): void {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const nameInput = modal.querySelector<HTMLInputElement>('input[name="name"]');
    setTimeout(() => nameInput?.focus(), 50);
  }

  function closeModal(): void {
    if (modal.classList.contains('hidden')) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = prevOverflow;
  }

  document.querySelectorAll<HTMLElement>('[data-open-consultation]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });
  modal.querySelectorAll<HTMLElement>('[data-consultation-close]').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// --- Project type buttons ---
function initProjectTypes(): void {
  document.querySelectorAll<HTMLElement>('[data-project-type]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const form = btn.closest('form');
      if (!form) return;
      const value = btn.dataset.projectType ?? '';
      const input = form.querySelector<HTMLInputElement>('input[name="projectType"]');
      if (input) input.value = value;
      form.querySelectorAll<HTMLElement>('[data-project-type]').forEach((other) => {
        const active = other === btn;
        other.classList.toggle('bg-[#C6A96B]', active);
        other.classList.toggle('border-2', active);
        other.classList.toggle('border-[#C6A96B]', active);
        other.classList.toggle('text-white', active);
        other.classList.toggle('font-medium', active);
        other.classList.toggle('shadow-sm', active);
        other.classList.toggle('bg-transparent', !active);
        other.classList.toggle('border', !active);
        other.classList.toggle('border-[#D1D1D1]', !active);
        other.classList.toggle('text-[#1F1F1F]', !active);
      });
    });
  });
}

// --- Lead forms ---
function initLeadForms(): void {
  document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach((form) => {
    if (form.dataset.formInit === '1') return;
    form.dataset.formInit = '1';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector<HTMLButtonElement>('[data-lead-submit]');
      const label = form.querySelector<HTMLElement>('[data-submit-label]');
      const loading = form.querySelector<HTMLElement>('[data-submit-loading]');

      const name = (form.elements.namedItem('name') as HTMLInputElement | null)?.value.trim() ?? '';
      const phone = (form.elements.namedItem('phone') as HTMLInputElement | null)?.value ?? '';
      const projectType = (form.querySelector<HTMLInputElement>('input[name="projectType"]')?.value) ?? 'design';
      const source = form.dataset.source ?? 'Сайт';

      if (!name) {
        toast('Пожалуйста, введите ваше имя', 'error');
        return;
      }
      if (!isValidPhone(phone)) {
        toast('Пожалуйста, введите корректный номер телефона', 'error');
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      label?.classList.add('hidden');
      loading?.classList.remove('hidden');
      loading?.classList.add('inline-flex');

      try {
        const response = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, projectType, source }),
        });
        const result = await response.json();

        if (result.success) {
          toast(result.message ?? 'Заявка успешно отправлена!', 'success');
          form.reset();
          const hidden = form.querySelector<HTMLInputElement>('input[name="projectType"]');
          if (hidden) hidden.value = 'design';
          form.querySelectorAll<HTMLElement>('[data-project-type]').forEach((btn, index) => {
            btn.classList.toggle('bg-[#C6A96B]', index === 0);
            btn.classList.toggle('border-2', index === 0);
            btn.classList.toggle('border-[#C6A96B]', index === 0);
            btn.classList.toggle('text-white', index === 0);
            btn.classList.toggle('font-medium', index === 0);
            btn.classList.toggle('shadow-sm', index === 0);
            btn.classList.toggle('bg-transparent', index !== 0);
            btn.classList.toggle('border', index !== 0);
            btn.classList.toggle('border-[#D1D1D1]', index !== 0);
            btn.classList.toggle('text-[#1F1F1F]', index !== 0);
          });
          if (form.closest('[data-consultation-modal]')) {
            const modal = form.closest<HTMLElement>('[data-consultation-modal]');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
          }
        } else {
          toast(result.message ?? 'Произошла ошибка. Попробуйте позже.', 'error');
        }
      } catch {
        toast('Произошла ошибка. Попробуйте позже.', 'error');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        label?.classList.remove('hidden');
        loading?.classList.add('hidden');
        loading?.classList.remove('inline-flex');
      }
    });
  });
}

// --- Phone masks ---
function initPhoneMasks(): void {
  document.querySelectorAll<HTMLInputElement>('[data-phone-mask]').forEach((input) => {
    if (input.dataset.maskInit === '1') return;
    input.dataset.maskInit = '1';
    input.addEventListener('input', () => {
      input.value = formatPhone(input.value);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value.length <= 2) {
        input.value = '+';
      }
    });
  });
}

// --- FAQ accordion ---
function initFaq(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-faq-toggle]'));
  if (items.length === 0) return;

  items.forEach((toggle) => {
    if (toggle.dataset.faqInit === '1') return;
    toggle.dataset.faqInit = '1';

    toggle.addEventListener('click', () => {
      const item = toggle.closest('[data-faq-item]');
      const answer = item?.querySelector<HTMLElement>('[data-faq-answer]');
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      const targetOpen = !isOpen;

      items.forEach((other) => {
        const otherItem = other.closest('[data-faq-item]');
        const otherAnswer = otherItem?.querySelector<HTMLElement>('[data-faq-answer]');
        other.setAttribute('aria-expanded', 'false');
        const icon = other.querySelector('[data-faq-icon]');
        if (icon) icon.classList.remove('rotate-180');
        if (otherAnswer && other !== toggle) otherAnswer.classList.add('hidden');
      });

      toggle.setAttribute('aria-expanded', String(targetOpen));
      const icon = toggle.querySelector('[data-faq-icon]');
      if (icon) icon.classList.toggle('rotate-180', targetOpen);
      if (answer) answer.classList.toggle('hidden', !targetOpen);
    });
  });
}

// --- Portfolio accordion ---
function initPortfolio(): void {
  const toggles = Array.from(document.querySelectorAll<HTMLElement>('[data-project-toggle]'));
  if (toggles.length === 0) return;

  toggles.forEach((toggle) => {
    if (toggle.dataset.portfolioInit === '1') return;
    toggle.dataset.portfolioInit = '1';

    toggle.addEventListener('click', () => {
      const project = toggle.closest('[data-project]');
      const answer = project?.querySelector<HTMLElement>('[data-project-answer]');
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      const targetOpen = !isOpen;

      toggles.forEach((other) => {
        const otherProject = other.closest('[data-project]');
        const otherAnswer = otherProject?.querySelector<HTMLElement>('[data-project-answer]');
        other.setAttribute('aria-expanded', 'false');
        const icon = other.querySelector('[data-project-icon]');
        if (icon) icon.classList.remove('rotate-180');
        if (otherAnswer && other !== toggle) otherAnswer.classList.add('hidden');
      });

      toggle.setAttribute('aria-expanded', String(targetOpen));
      const icon = toggle.querySelector('[data-project-icon]');
      if (icon) icon.classList.toggle('rotate-180', targetOpen);
      if (answer) answer.classList.toggle('hidden', !targetOpen);
    });
  });
}

function init(): void {
  initMobileMenu();
  initConsultationModal();
  initProjectTypes();
  initLeadForms();
  initPhoneMasks();
  initFaq();
  initPortfolio();
}

document.addEventListener('DOMContentLoaded', init);