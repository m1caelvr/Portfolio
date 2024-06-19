document.addEventListener('DOMContentLoaded', function() {
    const projects = [];

    fetch('../data/projects.json')
        .then(response => response.json())
        .then(data => {
            projects.push(...data);
            console.log(data);

            const figures = document.querySelectorAll('.figure-project');
            figures.forEach(figure => {
                figure.addEventListener('click', function() {
                    const projectId = this.getAttribute('data-id');
                    const project = projects.find(proj => proj.id === projectId);
                    openModal(project);
                });
            });
        });
});

function openModal(project) {
    const modal = document.getElementById('modal-content');
    const modalContentInner = document.getElementById('modal-content-inner');

    const createSlide = (media) => {
        if (media.capture_of === 'desktop') {
            imgSrc = './svg/desktop.svg';
        } else if (media.capture_of === 'mobile') {
            imgSrc = './svg/mobile.svg';
        }
    
        if (media.type === 'video') {
            return `<div class="swiper-slide">
                        <article class="gallery__card">
                            <video class="gallery__img" controls>
                                <source src="${media.src}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="gallery__data">
                                <!-- <img src="${media.video_svg}" alt="${media.capture_of}"> -->
                            </div>
                        </article>
                    </div>`;
        } else if (media.type === 'image') {
            return `<div class="swiper-slide">
                        <article class="gallery__card">
                            <img src="${media.src}" alt="${project.title}" class="gallery__img">
                            <div class="gallery__data">
                                <img src="${imgSrc}" alt="${media.capture_of}">
                            </div>
                        </article>
                    </div>`;
        }
        return '';
    };

    const createThumbnail = (media) => {
        let thumbnailSrc = media.type === 'video' ? media.video_svg : media.src;
        return `<div class="swiper-slide">
                    <div class="gallery__thumbnail">
                        <img src="${thumbnailSrc}" alt="image thumbnail" class="gallery__thumbnail-img">
                    </div>
                </div>`;
    };

    const slides = project.media.map(createSlide).join('');
    const thumbnails = project.media.map(createThumbnail).join('');

    modalContentInner.innerHTML = `
        <span class="close-btn">^</span>
        <div class="mophirsm-area">
            <div class='highlight-window' id='product-img'>
                <div class="gallery">
                    <div class="swiper gallery-cards">
                        <div class="swiper-wrapper">
                            ${slides}
                        </div>
                    </div>
                
                    <div class="gallery__overflow">
                        <div class="swiper gallery-thumbs">
                            <div class="swiper-wrapper">
                                ${thumbnails}
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                
                        <div class="swiper-button-next">
                            <i class="ri-arrow-right-line"></i>
                        </div>
                        <div class="swiper-button-prev">
                            <i class="ri-arrow-left-line"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class='window'>
                <div class='main-content'>
                    <h1>${project.title}</h1>
                    <h3>${project.deploy}</h3>
    
                    <div class='description' id='description'>
                        <h2>${project.subTitle}</h2>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class='size-picker'>
                        <h2>Tecnologias utilizadas:</h2>
                        <div class='range-picker' id='range-picker'>
                            <img src="./svg/logos-skills/html.svg" alt="" class="utilited-skills">
                            <img src="./svg/logos-skills/css.svg" alt="" class="utilited-skills">
                            <img src="./svg/logos-skills/js.svg" alt="" class="utilited-skills">
                        </div>
                    </div>
    
                    <div class='divider'></div>
    
                    <div class='purchase-info'>
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                            <button>ACESSAR GITHUB</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('show');
    document.querySelector('.close-btn').addEventListener('click', closeModal);

    let swiperCards = new Swiper(".gallery-cards", {
        loop: true,
        loopedSlides: project.media.length,
        effect: "fade"
    });
    
    let swiperThumbs = new Swiper(".gallery-thumbs", {
        loop: true,
        loopedSlides: project.media.length,
        slidesPerView: 3,
        centeredSlides: true,
        slideToClickedSlide: true,
    
        pagination: {
            el: ".swiper-pagination",
            type: "fraction"
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
    
    swiperThumbs.controller.control = swiperCards;
}

function closeModal() {
    const modal = document.getElementById('modal-content');
    if (modal) {
        modal.classList.remove('show');
    }
}
