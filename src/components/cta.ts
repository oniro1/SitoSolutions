import { validateForm, showFieldError, clearAllErrors } from '../utils/form-validator.js'
import type { FormData } from '../types/index.js'

export function initCta(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement | null
  if (!form) return

  const successMsg = document.getElementById('form-success')
  const submitBtn = form.querySelector<HTMLButtonElement>('[type="submit"]')
  const showFormBtn = document.getElementById('show-form-btn') as HTMLButtonElement | null

  form.setAttribute('aria-hidden', 'true')

  showFormBtn?.addEventListener('click', () => {
    form.classList.add('is-visible')
    form.setAttribute('aria-hidden', 'false')
    showFormBtn.setAttribute('aria-expanded', 'true')
    form.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.setTimeout(() => {
      form.querySelector<HTMLInputElement>('#f-name')?.focus()
    }, 350)
  })

  form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      field.classList.remove('field-error')
      field.parentElement?.querySelector('.error-msg')?.remove()
    })
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    clearAllErrors(form)

    const data: FormData = {
      name: (form.querySelector<HTMLInputElement>('#f-name')?.value ?? '').trim(),
      email: (form.querySelector<HTMLInputElement>('#f-email')?.value ?? '').trim(),
      phone: (form.querySelector<HTMLInputElement>('#f-phone')?.value ?? '').trim(),
      message: (form.querySelector<HTMLTextAreaElement>('#f-message')?.value ?? '').trim()
    }

    const { isValid, errors } = validateForm(data)

    if (!isValid) {
      if (errors.name) showFieldError('f-name', errors.name)
      if (errors.email) showFieldError('f-email', errors.email)
      if (errors.phone) showFieldError('f-phone', errors.phone)
      if (errors.message) showFieldError('f-message', errors.message)
      return
    }

    if (submitBtn) {
      submitBtn.disabled = true
      submitBtn.textContent = 'Invio in corso...'
    }

    setTimeout(() => {
      if (successMsg) {
        successMsg.style.display = 'block'
        form.reset()
      }
      if (submitBtn) {
        submitBtn.disabled = false
        submitBtn.textContent = 'Prenota la tua Call ->'
      }
      window.open('https://calendly.com/cerronisolutions', '_blank', 'noopener')
    }, 800)
  })
}
