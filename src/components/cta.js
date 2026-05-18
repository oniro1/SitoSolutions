import { validateForm, showFieldError, clearAllErrors } from '../utils/form-validator.js';
export function initCta() {
    const form = document.getElementById('contact-form');
    if (!form)
        return;
    const successMsg = document.getElementById('form-success');
    const submitBtn = form.querySelector('[type="submit"]');
    const showFormBtn = document.getElementById('show-form-btn');
    form.setAttribute('aria-hidden', 'true');
    showFormBtn?.addEventListener('click', () => {
        form.classList.add('is-visible');
        form.setAttribute('aria-hidden', 'false');
        showFormBtn.setAttribute('aria-expanded', 'true');
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.setTimeout(() => {
            form.querySelector('#f-name')?.focus();
        }, 350);
    });
    form.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('input', () => {
            field.classList.remove('field-error');
            field.parentElement?.querySelector('.error-msg')?.remove();
        });
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearAllErrors(form);
        const data = {
            name: (form.querySelector('#f-name')?.value ?? '').trim(),
            email: (form.querySelector('#f-email')?.value ?? '').trim(),
            phone: (form.querySelector('#f-phone')?.value ?? '').trim(),
            message: (form.querySelector('#f-message')?.value ?? '').trim()
        };
        const { isValid, errors } = validateForm(data);
        if (!isValid) {
            if (errors.name)
                showFieldError('f-name', errors.name);
            if (errors.email)
                showFieldError('f-email', errors.email);
            if (errors.phone)
                showFieldError('f-phone', errors.phone);
            if (errors.message)
                showFieldError('f-message', errors.message);
            return;
        }
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Invio in corso...';
        }
        setTimeout(() => {
            if (successMsg) {
                successMsg.style.display = 'block';
                form.reset();
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Prenota la tua Call ->';
            }
            window.open('https://calendly.com/cerronisolutions', '_blank', 'noopener');
        }, 800);
    });
}
