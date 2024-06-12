const addIntersectionObserver = (elements, delay = 0, threshold = 0) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (delay > 0) {
                    setTimeout(() => {
                        entry.target.classList.add('show');
                    }, delay * index);
                } else {
                    entry.target.classList.add('show');
                }
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, { threshold });

    elements.forEach((el) => observer.observe(el));
};

const sectionsToReveal = [
    { selector: '.landing-reveal', delay: 250, threshold: 0 },
    { selector: '.opacity-reveal-delay', delay: 100, threshold: 0 },
    { selector: '.opacity-reveal', delay: 0, threshold: 0 },
    { selector: '.scale-reveal-footer', delay: 100, threshold: 0 },
    { selector: '.scale-reveal', delay: 200, threshold: 0 },
    { selector: '.skills-reveal', delay: 100, threshold: 0 },
    { selector: '.itens-section', delay: 100, threshold: 0.3 }
];

document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'loading') {
                if (!loader.hasAttribute('loading')) {
                    console.log('O atributo loading foi removido.');
                    sectionsToReveal.forEach(section => {
                        const elements = document.querySelectorAll(section.selector);
                        addIntersectionObserver(elements, section.delay, section.threshold);
                    });

                    observer.disconnect();
                }
            }
        }
    });

    observer.observe(loader, { attributes: true });

    setTimeout(() => {
        if (loader) {
            loader.removeAttribute('loading');
        }
    }, 4200);
});