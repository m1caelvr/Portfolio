const header = document.getElementById('header');

function checkWindowSize() {
    // if (window.innerWidth > 768) {
    if (window.innerWidth >= 1050) {
        if (header.classList.contains('header-mobile')) {
            header.classList.remove('header-mobile');
        }
    } else {
        header.classList.add('header-mobile');
    }
}
window.addEventListener('resize', checkWindowSize);
checkWindowSize();
