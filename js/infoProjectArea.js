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
        <h1>${project.title}</h1>
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
        <a href="${project.github}" target="_blank">GitHub</a>
    `;
    console.log('end');

    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('modal-content');
    if (modal) {
        modal.classList.remove('show');
    }
}

// document.addEventListener('click', function(event) {
//     const modal = document.getElementById('modal-content');
//     if (modal && modal.classList.contains('show') && !modal.contains(event.target)) {
//         closeModal();
//     }
// });

// Captura o evento de clique no botão de fechar
document.querySelector('.close-btn').addEventListener('click', closeModal);