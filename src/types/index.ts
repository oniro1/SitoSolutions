export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  text: string
  result: string
  avatarInitials: string
  avatarUrl: string
}

export interface Service {
  id: string
  number: string
  title: string
  description: string
  features: string[]
}

export interface ProcessStep {
  number: string
  tag: string
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface KPI {
  value: number
  prefix: string
  suffix: string
  label: string
}

export interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: Partial<Record<keyof FormData, string>>
}

export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  radius: number
}

export interface ParticleOptions {
  count: number
  color: string
  lineColor: string
  connectionDistance: number
  speed: number
}
