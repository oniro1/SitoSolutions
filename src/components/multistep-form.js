import { validateForm, showFieldError, clearAllErrors } from '../utils/form-validator.js';
export function initMultiStepForm() {
    const form = document.getElementById('contact-form');
    if (!form)
        return;
    const panels = form.querySelectorAll('.form-panel');
    const tabs = document.querySelectorAll('.form-step-tab');
    // Service tile toggle
    form.querySelectorAll('.service-tile').forEach((tile) => {
        const cb = tile.querySelector('input[type="checkbox"]');
        tile.addEventListener('click', () => {
            if (!cb)
                return;
            cb.checked = !cb.checked;
            tile.classList.toggle('selected', cb.checked);
        });
        tile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tile.click();
            }
        });
    });
    function goTo(step) {
        panels.forEach((p, i) => {
            p.classList.toggle('active', i + 1 === step);
        });
        tabs.forEach((t, i) => {
            const isActive = i + 1 === step;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', String(isActive));
        });
        form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    // Step 1 to 2
    document.getElementById('step1-next')?.addEventListener('click', () => {
        clearAllErrors(form);
        const nameVal = (form.querySelector('#f-name')?.value ?? '').trim();
        const emailVal = (form.querySelector('#f-email')?.value ?? '').trim();
        const roleVal = (form.querySelector('#f-role')?.value ?? '').trim();
        let valid = true;
        if (!nameVal) {
            showFieldError('f-name', 'Inserisci il tuo nome');
            valid = false;
        }
        if (!roleVal) {
            showFieldError('f-role', 'Inserisci il tuo ruolo');
            valid = false;
        }
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailVal)) {
            showFieldError('f-email', 'Email non valida');
            valid = false;
        }
        if (valid)
            goTo(2);
    });
    // Step 2 to 3
    document.getElementById('step2-next')?.addEventListener('click', () => { goTo(3); });
    // Back buttons
    document.getElementById('step2-back')?.addEventListener('click', () => goTo(1));
    document.getElementById('step3-back')?.addEventListener('click', () => goTo(2));
    // Submit
    const successMsg = document.getElementById('form-success');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearAllErrors(form);
        const data = {
            name: ((form.querySelector('#f-name')?.value ?? '') + ' ' +
                (form.querySelector('#f-surname')?.value ?? '')).trim(),
            email: (form.querySelector('#f-email')?.value ?? '').trim(),
            phone: (form.querySelector('#f-phone')?.value ?? '').trim(),
            message: (form.querySelector('#f-message')?.value ?? '').trim()
        };
        const result = validateForm(data);
        if (!result.isValid) {
            if (result.errors.message)
                showFieldError('f-message', result.errors.message);
            return;
        }
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Invio in corso...';
        }
        setTimeout(() => {
            if (successMsg)
                successMsg.style.display = 'block';
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Invia Richiesta';
            }
            form.reset();
            form.querySelectorAll('.service-tile').forEach((t) => t.classList.remove('selected'));
            goTo(1);
            window.open('https://calendly.com/cerronisolutions', '_blank', 'noopener');
        }, 800);
    });
}
