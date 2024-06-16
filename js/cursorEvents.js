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

const projectsList = document.getElementById('projects-list');
const gridIndicator = document.getElementById('grid-indicator');
const indicators = gridIndicator.querySelectorAll('input[name="indicator"]');
const root = document.documentElement;

document.addEventListener('DOMContentLoaded', function () {

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('change', () => {
            gridIndicator.classList.remove('start', 'center', 'end');
            if (index === 0) {
                gridIndicator.classList.add('start');
                root.style.setProperty('--projects-grid', 'repeat(1, 1fr)');
            } else if (index === 1) {
                gridIndicator.classList.add('center');
                root.style.setProperty('--projects-grid', 'repeat(2, 1fr)');
            } else if (index === 2) {
                gridIndicator.classList.add('end');
                root.style.setProperty('--projects-grid', 'repeat(3, 1fr)');
            }

            heigthProjectList(indicator);
        });
    });
});

function heigthProjectList(el) {
    if (projectsList.children.length > 0) {
        const firstItem = projectsList.querySelector('#projects-list > *:first-child');
        const itemHeight = firstItem.getBoundingClientRect().height;
        const maxProjectsVisualizer = 2;
        const maxHeight = itemHeight * maxProjectsVisualizer;
        
        const projectsItems = projectsList.children.length;
        const columnsValue = parseInt(el.getAttribute('columns-value'));
        const rows = Math.ceil(projectsItems / columnsValue);
        console.log(`Número de linhas: ${rows}`);

        if (rows > maxProjectsVisualizer) {
            projectsList.style.maxHeight = `calc(${maxHeight}px + 2rem * ${maxProjectsVisualizer})`;
        } else {
            projectsList.style.maxHeight = 'none';
        }

    } else {
        console.error('Nenhum item na lista.');
    }
}