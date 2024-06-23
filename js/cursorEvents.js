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

function hoverIsExtend() {
    if (hoverArea.getAttribute('extend')) {
        return true;
    }
}

function hoverAreaAdd() {
    hoverArea.setAttribute('extend', 'true');
}
function hoverAreaRemove() {
    if (hoverIsExtend()) {
        hoverArea.removeAttribute('extend');
    }
}

function desktopButtonAbout() {
    hoverArea.addEventListener('mouseenter', hoverAreaAdd);
    hoverArea.addEventListener('mouseleave', hoverAreaRemove);

    hoverArea.__handleMouseEnter = hoverAreaAdd;
    hoverArea.__handleMouseLeave = hoverAreaRemove;
}

function mobileButtonAbout() {
    const handleMouse = () => {
        if (!hoverIsExtend()) {
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
            // projectsList.style.maxHeight = `calc(${maxHeight}px + 2rem * ${maxProjectsVisualizer})`;
            projectsList.style.maxHeight = `max-content`;
        } else {
            projectsList.style.maxHeight = 'none';
        }

    } else {
        console.error('Nenhum item na lista.');
    }
}

function createCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    cursor.id = 'cursor';

    document.body.appendChild(cursor);
}

function cursorInProject(elements, cursor, className) {
    elements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add(className);
        });

        element.addEventListener('mouseleave', function() {
            cursor.classList.remove(className);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createCursor();
    var timeout = null;
    var inatividadeDelay = 1500;

    const cursor = document.getElementById('cursor');
    const projects = document.querySelectorAll('article.itens-section');
    const sectionContact = document.querySelectorAll('section.contact');

    function hideCursor() {
        let cursor = document.getElementById('cursor');
        cursor.classList.remove('show');
    }
    
    function showCursor() {
        let cursor = document.getElementById('cursor');
        cursor.classList.add('show');
    }

    document.addEventListener('mousemove', function(e) {
        showCursor();
        clearTimeout(timeout);
        cursorInProject(projects, cursor, 'projects-section');
        cursorInProject(sectionContact, cursor, 'contact-section');

        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';

        timeout = setTimeout(hideCursor, inatividadeDelay);
    });

    setTimeout(hideCursor, inatividadeDelay);

    document.addEventListener('mouseleave', function() {
        hideCursor();
    });

});