export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#')
                return;
            const target = document.querySelector(href);
            if (!target)
                return;
            e.preventDefault();
            const navHeight = (document.querySelector('#nav')?.offsetHeight ?? 66);
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}
