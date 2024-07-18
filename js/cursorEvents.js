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

const currentPageSpan = document.querySelector('.current-page');
const totalPagesSpan = document.querySelector('.total-pages');

TotalPagesGlobal = 1

document.addEventListener('DOMContentLoaded', function () {
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('change', () => {
            updateGridIndicatorClass(index);
            heightProjectList(indicator);
            updateGridIndicatorNumbersTotalPages(index + 1);
            TotalPagesGlobal = index + 1
        });
    });

    adjustGridIndicator();
    updateGridIndicatorNumbersTotalPages(1);

    setupIntersectionObserver();
});

window.addEventListener('resize', adjustGridIndicator);

function updateGridIndicatorClass(index) {
    gridIndicator.classList.remove('start', 'center', 'end');

    if (index === 0) {
        gridIndicator.classList.add('start');
        projectsList.style.gridTemplateColumns = 'repeat(1, 1fr)';
    } else if (index === 1) {
        gridIndicator.classList.add('center');
        projectsList.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (index === 2) {
        gridIndicator.classList.add('end');
        projectsList.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
}

function adjustGridIndicator() {
    const screenWidth = window.innerWidth;

    gridIndicator.classList.remove('start', 'center', 'end');
    
    if (screenWidth <= 470) {
        gridIndicator.classList.add('start');
    } else if (screenWidth <= 1050) {
        gridIndicator.classList.add('center');
    } else {
        gridIndicator.classList.add('end');
    }
}

function updateGridIndicatorNumbersTotalPages(totalPages) {
    totalPagesSpan.textContent = totalPages;
}
function updateGridIndicatorNumbersCurrentPage(currentPage) {
    currentPageSpan.textContent = currentPage;
}

function setupIntersectionObserver() {
    const options = {
        root: projectsList,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const articlesPerRow = getArticlesPerRow();
                const index = Array.from(projectsList.children).indexOf(entry.target) + 1;
                const asides = document.querySelectorAll('#projects-list > article').length;
                
                let currentPage = Math.ceil(index / articlesPerRow);
                currentPage -= Math.floor(asides / 2);

                console.log("TotalPagesGlobal: " + TotalPagesGlobal);

                if (TotalPagesGlobal == 1 || TotalPagesGlobal == 2){
                    currentPage -= 1;
                }

                if (TotalPagesGlobal == 1){
                    currentPage = 1;
                }

                updateGridIndicatorNumbersCurrentPage(currentPage);
            }
        });
    }, options);

    projectsList.querySelectorAll('#projects-list > article').forEach(article => {
        observer.observe(article);
    });
}

function getArticlesPerRow() {
    const testArticle = projectsList.querySelector('#projects-list > article');
    if (!testArticle) return 1;

    const articleWidth = testArticle.offsetWidth;
    const listWidth = projectsList.offsetWidth;

    return Math.floor(listWidth / articleWidth);
}

function heightProjectList(el) {
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
    let timeoutId;

    elements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            clearTimeout(timeoutId);

            cursor.classList.add(className);

            timeoutId = setTimeout(function() {
                cursor.classList.remove(className);
            }, 2000);
        });

        element.addEventListener('mouseleave', function() {
            clearTimeout(timeoutId);
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