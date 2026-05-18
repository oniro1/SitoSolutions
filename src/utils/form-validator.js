export function validateForm(data) {
    const errors = {};
    if (!data.name.trim() || data.name.trim().length < 2) {
        errors.name = 'Inserisci il tuo nome (minimo 2 caratteri)';
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim() || !emailRe.test(data.email)) {
        errors.email = 'Inserisci un indirizzo email valido';
    }
    const phoneRe = /^[\d\s\+\-\(\)]{7,}$/;
    if (data.phone && !phoneRe.test(data.phone)) {
        errors.phone = 'Numero di telefono non valido';
    }
    if (!data.message.trim() || data.message.trim().length < 20) {
        errors.message = 'Descrivi brevemente la tua situazione (minimo 20 caratteri)';
    }
    return { isValid: Object.keys(errors).length === 0, errors };
}
export function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field)
        return;
    field.classList.add('field-error');
    const existing = field.parentElement?.querySelector('.error-msg');
    if (existing)
        existing.remove();
    const msg = document.createElement('span');
    msg.className = 'error-msg';
    msg.textContent = message;
    field.parentElement?.appendChild(msg);
}
export function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field)
        return;
    field.classList.remove('field-error');
    field.parentElement?.querySelector('.error-msg')?.remove();
}
export function clearAllErrors(formEl) {
    formEl.querySelectorAll('.field-error').forEach((el) => el.classList.remove('field-error'));
    formEl.querySelectorAll('.error-msg').forEach((el) => el.remove());
}
