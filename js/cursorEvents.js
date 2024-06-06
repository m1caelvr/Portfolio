document.addEventListener('DOMContentLoaded', () => {
    const hoverArea = document.getElementById('about-li-button');
    
    const handleMouseEnter = () => {
        hoverArea.setAttribute('extend', 'true');
        console.log('Mouse entered #about-header, extend attribute added');
    };

    const handleMouseLeave = () => {
        hoverArea.removeAttribute('extend');
        console.log('Mouse left #about-header, extend attribute removed');
    };

    hoverArea.addEventListener('mouseenter', handleMouseEnter);
    hoverArea.addEventListener('mouseleave', handleMouseLeave);
});