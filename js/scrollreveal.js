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
    { selector: '.skills-reveal', delay: 0, threshold: 0 },
    { selector: '.itens-section', delay: 100, threshold: 0.3 }
];

sectionsToReveal.forEach(section => {
    const elements = document.querySelectorAll(section.selector);
    addIntersectionObserver(elements, section.delay, section.threshold);
});