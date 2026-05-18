// ─── Scroll Reveal ───────────────────────────────────────────────────────────
export function initScrollReveal() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length)
        return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay ?? '0';
                el.style.transitionDelay = `${delay}ms`;
                el.classList.add('revealed');
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
    elements.forEach((el) => observer.observe(el));
}
// ─── Count Up ────────────────────────────────────────────────────────────────
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}
export function countUp(el, target, duration = 1800, suffix = '', prefix = '') {
    const startTime = performance.now();
    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(eased * target);
        el.textContent = `${prefix}${current}${suffix}`;
        if (progress < 1)
            requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
export function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length)
        return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.count ?? '0');
                const suffix = el.dataset.suffix ?? '';
                const prefix = el.dataset.prefix ?? '';
                countUp(el, target, 1800, suffix, prefix);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.4 });
    counters.forEach((el) => observer.observe(el));
}
// ─── Particle Canvas ─────────────────────────────────────────────────────────
export class ParticleCanvas {
    constructor(canvas, options = {}) {
        Object.defineProperty(this, "canvas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "particles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "animId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "resizeObserver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            throw new Error('Canvas 2D context not available');
        this.ctx = ctx;
        this.options = {
            count: 160,
            color: 'rgba(78,165,163,0.55)',
            lineColor: 'rgba(78,165,163,0.05)',
            connectionDistance: 130,
            speed: 0.28,
            ...options
        };
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(canvas.parentElement ?? document.body);
    }
    init() {
        this.resize();
        this.particles = Array.from({ length: this.options.count }, () => this.createParticle());
        this.animate();
    }
    createParticle() {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.5 + 0.5) * this.options.speed;
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            opacity: Math.random() * 0.4 + 0.1,
            radius: Math.random() * 1.2 + 0.3
        };
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Update positions
        for (const p of this.particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > this.canvas.width)
                p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height)
                p.vy *= -1;
        }
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const a = this.particles[i];
                const b = this.particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.options.connectionDistance) {
                    const alpha = (1 - dist / this.options.connectionDistance) * 0.06;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(78,165,163,${alpha})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(a.x, a.y);
                    this.ctx.lineTo(b.x, b.y);
                    this.ctx.stroke();
                }
            }
        }
        // Draw particles
        for (const p of this.particles) {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(78,165,163,${p.opacity})`;
            this.ctx.fill();
        }
        this.animId = requestAnimationFrame(() => this.animate());
    }
    resize() {
        const parent = this.canvas.parentElement;
        if (!parent)
            return;
        this.canvas.width = parent.offsetWidth;
        this.canvas.height = parent.offsetHeight;
    }
    destroy() {
        cancelAnimationFrame(this.animId);
        this.resizeObserver.disconnect();
    }
}
