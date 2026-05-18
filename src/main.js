import './styles/main.css';
import { initNav } from './components/nav.js';
import { initHero } from './components/hero.js';
import { initFaq } from './components/faq.js';
import { initScrollReveal, initCounters } from './utils/animations.js';
import { initSmoothScroll } from './utils/smooth-scroll.js';
import { initTestimonianze } from './components/testimonianze.js';
import { initMultiStepForm } from './components/multistep-form.js';
document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initHero();
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    initTestimonianze();
    initFaq();
    initMultiStepForm();
});
