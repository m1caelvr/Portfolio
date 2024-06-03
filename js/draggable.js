document.querySelectorAll('img').forEach(el => {
    el.setAttribute('draggable', 'false');
    el.style.userSelect = 'none';
    el.style.webkitUserSelect = 'none';
    el.style.mozUserSelect = 'none';
    el.style.msUserSelect = 'none';
});