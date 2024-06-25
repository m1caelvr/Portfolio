document.addEventListener('DOMContentLoaded', function() {
    function addFullscreenEventToImages() {
        const images = document.querySelectorAll('.fullscreen-img');

        images.forEach(function(image) {
            image.addEventListener('click', function() {
                if (image.requestFullscreen) {
                    image.requestFullscreen();
                } else if (image.mozRequestFullScreen) { // Firefox
                    image.mozRequestFullScreen();
                } else if (image.webkitRequestFullscreen) { // Chrome, Safari and Opera
                    image.webkitRequestFullscreen();
                } else if (image.msRequestFullscreen) { // IE/Edge
                    image.msRequestFullscreen();
                }
                image.classList.add('fullscreen-active');
            });
        });

        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement) {
                images.forEach(function(image) {
                    image.classList.remove('fullscreen-active');
                });
            }
        });
    }

    // Chama a função para adicionar o evento de clique nas imagens
    addFullscreenEventToImages();
});