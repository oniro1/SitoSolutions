export function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector<HTMLElement>(href)
      if (!target) return
      e.preventDefault()
      const navHeight = (document.querySelector<HTMLElement>('#nav')?.offsetHeight ?? 66)
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8
      window.scrollTo({ top, behavior: 'smooth' })
    })
  })
}
