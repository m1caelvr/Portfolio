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

    modalContentInner.innerHTML = `
        <!-- <h1>${project.title}</h1>
        <p>${project.moreInfo}</p>
        <div class="media">
            ${project.media.map(media => {
                if (media.type === 'video') {
                    return `<video controls>
                                <source src="${media.src}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>`;
                } else if (media.type === 'image') {
                    return `<img src="${media.src}" alt="${project.title}">`;
                }
                return '';
            }).join('')}
        </div>
        <a href="${project.link}" target="_blank">Visite o site</a><br>
        <a href="${project.github}" target="_blank">GitHub</a> -->

        <span class="close-btn">x</span>
            <div class="mophirsm-area">
                <div class='highlight-window' id='product-img'>
                    <div class="gallery">
                        <div class="swiper gallery-cards">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <article class="gallery__card">
                                        <img src="https://images.unsplash.com/photo-1669671943625-e20799ee5f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzI0MjY3ODQ&ixlib=rb-4.0.3&q=80&w=400" alt="image gallery" class="gallery__img">
                                        <div class="gallery__data">
                                            <h3 class="gallery__title">Shoes</h3>
                                            <span class="gallery__subtitle">Feet</span>
                                        </div>
                                    </article>
                                </div>
                    
                                <div class="swiper-slide">
                                    <article class="gallery__card">
                                        <img src="https://images.unsplash.com/photo-1670832215724-cce6d9ee619c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzI0MjY3ODQ&ixlib=rb-4.0.3&q=80&w=400" alt="image gallery" class="gallery__img">
                                        <div class="gallery__data">
                                            <h3 class="gallery__title">Lotion</h3>
                                            <span class="gallery__subtitle">Face</span>
                                        </div>
                                    </article>
                                </div>
                    
                                <div class="swiper-slide">
                                    <article class="gallery__card">
                                        <img src="https://images.unsplash.com/photo-1670509684960-101c061c9c5c?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzI0MjY4MzU&ixlib=rb-4.0.3&q=80" alt="image gallery" class="gallery__img">
                                        <div class="gallery__data">
                                            <h3 class="gallery__title">Christmas</h3>
                                            <span class="gallery__subtitle">Tree</span>
                                        </div>
                                    </article>
                                </div>
                    
                                <div class="swiper-slide">
                                    <article class="gallery__card">
                                        <img src="https://images.unsplash.com/photo-1670825372656-af0361b7425a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzI0MjY4MzU&ixlib=rb-4.0.3&q=80&w=400" alt="image gallery" class="gallery__img">
                                        <div class="gallery__data">
                                            <h3 class="gallery__title">Vanagon</h3>
                                            <span class="gallery__subtitle">VW</span>
                                        </div>
                                    </article>
                                </div>
                    
                                <div class="swiper-slide">
                                    <article class="gallery__card">
                                        <img src="https://images.unsplash.com/photo-1671967097680-f5938c6aea1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzI0MjY4MzU&ixlib=rb-4.0.3&q=80&w=400" alt="image gallery" class="gallery__img">
                                        <div class="gallery__data">
                                            <h3 class="gallery__title">Explore</h3>
                                            <span class="gallery__subtitle">Waterfall</span>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    
                        <div class="gallery__overflow">
                            <div class="swiper gallery-thumbs">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <div class="gallery__thumbnail">
                                            <img src="https://images.unsplash.com/photo-1669671943625-e20799ee5f42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzI0MjY3ODQ&ixlib=rb-4.0.3&q=80&w=400" alt="image gallery" alt="image thumbnail" class="gallery__thumbnail-img">
                                        </div>
                                    </div>
                    
                                    <div class="swiper-slide">
                                        <div class="gallery__thumbnail">
                                            <img src="https://images.unsplash.com/photo-1670832215724-cce6d9ee619c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzI0MjY3ODQ&ixlib=rb-4.0.3&q=80&w=400" alt="image gallery" alt="image thumbnail" class="gallery__thumbnail-img">
                                        </div>
                                    </div>
                    
                                    <div class="swiper-slide">
                                        <div class="gallery__thumbnail">
                                            <img src="https://images.unsplash.com/photo-1670509684960-101c061c9c5c?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzI0MjY4MzU&ixlib=rb-4.0.3&q=80" alt="image thumbnail" class="gallery__thumbnail-img">
                                        </div>
                                    </div>
                    
                                    <div class="swiper-slide">
                                        <div class="gallery__thumbnail">
                                            <img src="https://images.unsplash.com/photo-1670825372656-af0361b7425a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzI0MjY4MzU&ixlib=rb-4.0.3&q=80&w=400" alt="image gallery" alt="image thumbnail" class="gallery__thumbnail-img">
                                        </div>
                                    </div>
                    
                                    <div class="swiper-slide">
                                        <div class="gallery__thumbnail">
                                            <img src="https://images.unsplash.com/photo-1671967097680-f5938c6aea1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzI0MjY4MzU&ixlib=rb-4.0.3&q=80&w=400" alt="image thumbnail" class="gallery__thumbnail-img">
                                        </div>
                                    </div>
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
                        <h3>deploy.com.br</h3>
        
                        <div class='description' id='description'>
                            <h2>Modelo E-commerce</h2>
                            <p>
                                Men's minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and
                                single back vent. Slim fit with clean, straight shape. Above-knee length.
                            </p>
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
                            <button>ACESSAR GITHUB</button>
                        </div>
                    </div>
                </div>
            </div>
    `;

    modal.classList.add('show');
    document.querySelector('.close-btn').addEventListener('click', closeModal);

    let swiperCards = new Swiper(".gallery-cards", {
        loop: true,
        loopedSlides: 5,
        cssMode: true,
        effect: "fade"
    });
    
    let swiperThumbs = new Swiper(".gallery-thumbs", {
        loop: true,
        loopedSlides: 5,
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
