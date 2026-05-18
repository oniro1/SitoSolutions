export function initFaq(): void {
  const items = document.querySelectorAll<HTMLElement>('.faq-item')

  items.forEach((item) => {
    const btn  = item.querySelector<HTMLButtonElement>('.faq-btn')
    const body = item.querySelector<HTMLElement>('.faq-body')
    if (!btn || !body) return

    btn.setAttribute('aria-expanded', 'false')

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true'

      // Close all
      items.forEach((other) => {
        const otherBtn  = other.querySelector<HTMLButtonElement>('.faq-btn')
        const otherBody = other.querySelector<HTMLElement>('.faq-body')
        if (otherBtn && otherBody) {
          otherBtn.setAttribute('aria-expanded', 'false')
          otherBody.style.height = '0'
        }
      })

      // Open this if it was closed
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true')
        body.style.height = `${body.scrollHeight}px`
      }
    })
  })
}
