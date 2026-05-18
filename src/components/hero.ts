import { ParticleCanvas } from '../utils/animations.js'

export function initHero(): void {
  const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement | null
  if (!canvas) return

  const pc = new ParticleCanvas(canvas, {
    count: 160,
    connectionDistance: 130,
    speed: 0.28
  })
  pc.init()
}
