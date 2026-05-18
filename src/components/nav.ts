export function initNav(): void {
  const nav = document.getElementById('nav')
  const progress = document.getElementById('nav-progress')
  const floatCta = document.getElementById('floatCta')
  const hbg = document.getElementById('hamburger')
  const mob = document.getElementById('mob-menu')

  if (!nav || !progress) return

  // Scroll effects
  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pct = docH > 0 ? (scrollY / docH) * 100 : 0

      nav.classList.toggle('scrolled', scrollY > 60)
      progress.style.width = `${pct}%`
      floatCta?.classList.toggle('show', scrollY > 500)
    },
    { passive: true }
  )

  // Hamburger
  if (hbg && mob) {
    hbg.addEventListener('click', () => {
      const isOpen = mob.classList.toggle('open')
      hbg.classList.toggle('active', isOpen)
      hbg.setAttribute('aria-expanded', String(isOpen))
    })

    mob.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mob.classList.remove('open')
        hbg.classList.remove('active')
        hbg.setAttribute('aria-expanded', 'false')
      })
    })
  }

  // Active section highlight
  const sections = document.querySelectorAll<HTMLElement>('section[id]')
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]')

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
          })
        }
      })
    },
    { rootMargin: '-40% 0px -60% 0px' }
  )

  sections.forEach((s) => sectionObserver.observe(s))
}
