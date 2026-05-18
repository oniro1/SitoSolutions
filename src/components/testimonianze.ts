export function initTestimonianze(): void {
  const track   = document.querySelector<HTMLElement>('.testi-track')
  const slides  = document.querySelectorAll<HTMLElement>('.testi-slide')
  const dots    = document.querySelectorAll<HTMLButtonElement>('.testi-dot')
  const prevBtn = document.querySelector<HTMLButtonElement>('.testi-btn-prev')
  const nextBtn = document.querySelector<HTMLButtonElement>('.testi-btn-next')
  const liveEl  = document.getElementById('testi-live')

  if (!track || !slides.length) return

  const perView = (): number => (window.innerWidth <= 860 ? 1 : 2)
  const total   = (): number => Math.max(0, slides.length - perView() + 1)
  let current   = 0
  let timer: ReturnType<typeof setInterval> | null = null

  function go(idx: number): void {
    const t = total()
    current = ((idx % t) + t) % t
    const pct = (100 / perView()) * current
    track!.style.transform = `translateX(-${pct}%)`
    dots.forEach((d, i) => d.classList.toggle('active', i === current))
    if (liveEl) liveEl.textContent = `Testimonianza ${current + 1} di ${t}`
  }

  function start(): void { timer = setInterval(() => go(current + 1), 5500) }
  function stop():  void { if (timer) clearInterval(timer) }

  prevBtn?.addEventListener('click', () => { stop(); go(current - 1); start() })
  nextBtn?.addEventListener('click', () => { stop(); go(current + 1); start() })
  dots.forEach((d, i) => d.addEventListener('click', () => { stop(); go(i); start() }))

  // Touch
  let tx = 0
  track.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; stop() }, { passive: true })
  track.addEventListener('touchend',   (e) => {
    const dx = e.changedTouches[0].clientX - tx
    if (Math.abs(dx) > 40) go(dx < 0 ? current + 1 : current - 1)
    start()
  }, { passive: true })

  // Pause on hover
  track.addEventListener('mouseenter', stop)
  track.addEventListener('mouseleave', start)

  // Resize
  let rt: ReturnType<typeof setTimeout>
  window.addEventListener('resize', () => {
    clearTimeout(rt)
    rt = setTimeout(() => { go(0) }, 200)
  }, { passive: true })

  go(0)
  start()
}
