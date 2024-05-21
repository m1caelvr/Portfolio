const main = document.getElementById('main');
const sections = document.querySelectorAll('.section');

main.addEventListener('scroll', checkSectionInView);
window.addEventListener('load', checkSectionInView);

function checkSectionInView() {
  // console.log("foi");
  const scrollPosition = main.scrollTop;
  const windowHeight = main.clientHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      section.classList.add('active');
      observeFunction(section.id)
    } else {
      section.classList.remove('active');
    }
  });
}

function observeFunction(i) {
  const homeIcon = document.getElementById('home-icon');
  const chevronIcon = document.getElementById('chevron-icon');

  if (i === 'section-landing') {
    homeIcon.src = './svg/home.svg';
    if (chevronIcon.classList.contains('chevron-icon-focus')) {
      chevronIcon.classList.remove('chevron-icon-focus')
      chevronIcon.src = './svg/chevron-down-circle-outline.svg';
    }
  } else if (i === 'section-main') {
    chevronIcon.classList.add('chevron-icon-focus')
    homeIcon.src = './svg/home-outline.svg';
    setTimeout(() => {
      chevronIcon.src = './svg/chevron-down-circle.svg';
    }, 250);
  }
}

// Adicionando evento de observação para cada elemento ativo
const actived = document.querySelectorAll(".active");
actived.forEach(active => {
  observeFunction(active);
});
