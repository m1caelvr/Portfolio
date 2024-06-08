const hoverArea = document.getElementById('about-li-button');
const hoverAreaHeader = document.getElementById('about-li-hover-area');
let isDesktopListenersAdded = false;
let isMobileListenersAdded = false;

window.addEventListener('DOMContentLoaded', aboutButton);
window.addEventListener('resize', aboutButton);

function aboutButton() {
    const windowWidth = window.innerWidth;

    hoverAreaRemove();

    if (windowWidth > 1050) {
        if (!isDesktopListenersAdded) {
            removeMobileListeners();
            desktopButtonAbout();
            isDesktopListenersAdded = true;
            isMobileListenersAdded = false;
        }
    } else {
        if (!isMobileListenersAdded) {
            removeDesktopListeners();
            mobileButtonAbout();
            isMobileListenersAdded = true;
            isDesktopListenersAdded = false;
        }
    }
}

function desktopButtonAbout() {
    const handleMouseEnter = () => {
        hoverArea.setAttribute('extend', 'true');
    };

    const handleMouseLeave = () => {
        hoverAreaRemove();
    };

    hoverArea.addEventListener('mouseenter', handleMouseEnter);
    hoverArea.addEventListener('mouseleave', handleMouseLeave);

    hoverArea.__handleMouseEnter = handleMouseEnter;
    hoverArea.__handleMouseLeave = handleMouseLeave;
}

function mobileButtonAbout() {
    const handleMouse = () => {
        const isExtended = hoverArea.getAttribute('extend') === 'true';

        if (!isExtended) {
            hoverArea.setAttribute('extend', 'true');
        } else {
            hoverAreaRemove();
        }
    };

    hoverArea.addEventListener('click', handleMouse);
    hoverArea.__handleMouse = handleMouse;
}

function removeDesktopListeners() {
    if (hoverArea && hoverArea.__handleMouseEnter && hoverArea.__handleMouseLeave) {
        hoverArea.removeEventListener('mouseenter', hoverArea.__handleMouseEnter);
        hoverArea.removeEventListener('mouseleave', hoverArea.__handleMouseLeave);
    }
}

function removeMobileListeners() {
    if (hoverArea && hoverArea.__handleMouse) {
        hoverArea.removeEventListener('click', hoverArea.__handleMouse);
    }
}
function hoverAreaRemove() {
    const isExtended = hoverArea.getAttribute('extend') === 'true';

    if (isExtended) {
        hoverArea.removeAttribute('extend');
    }
}

document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    const isHoverArea = clickedElement === hoverArea || hoverArea.contains(clickedElement);

    if (!isHoverArea) {
        hoverAreaRemove();
    }
});
