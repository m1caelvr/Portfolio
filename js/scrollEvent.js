const main = document.getElementById('main');
const sectionMain = document.getElementById('section-main');
const sectionsInMain = document.querySelectorAll('main > section');
const sectionsInSectionMain = document.querySelectorAll('section#section-main > section');
const navSectionMainSvgs = document.querySelectorAll('#nav-section-main > li svg');

document.addEventListener('DOMContentLoaded', function() {
  function getZoomLevel() {
    return window.devicePixelRatio || 1;
  }

  function checkSectionInView() {
    const scrollPosition = main.scrollTop;
    const zoom = getZoomLevel();

    sectionsInMain.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollPosition;
      const sectionBottom = sectionTop + rect.height * zoom;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        section.classList.add("active");
        observeFunction(section.id);
      } else {
        section.classList.remove("active");
      }
    });
  }

  function checkSecundarySection() {
    const scrollPosition = sectionMain.scrollTop;
    const zoom = getZoomLevel();
    
    sectionsInSectionMain.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollPosition * 0.8;
      const sectionBottom = sectionTop + rect.height;


      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        iconSecundarySectionInFocus(section);
      }
    });
  }

  function iconSecundarySectionInFocus(section) {
    navSectionMainSvgs.forEach(svg => svg.classList.remove('focus'));

    if (section.classList.contains('about')) {
      navSectionMainSvgs[0].classList.add('focus');
    } else if (section.classList.contains('skills')) {
      navSectionMainSvgs[1].classList.add('focus');
    } else if (section.classList.contains('projects')) {
      navSectionMainSvgs[2].classList.add('focus');
    } else if (section.classList.contains('contact')) {
      navSectionMainSvgs[3].classList.add('focus');
    }
  }

  function observeFunction(sectionId) {
    const chevronIcon = document.getElementById("chevronIcon");
    
    if (sectionId === "section-landing") {
      alterIcon_home("homeIcon", "fill");
      alterIcon_chevronIcon("notFill");
      headerAdjust("show");
      SecundarySection("noShow");
      if (chevronIcon.classList.contains("chevron-icon-focus")) {
        chevronIcon.classList.remove("chevron-icon-focus");
      }
    } else if (sectionId === "section-main") {
      chevronIcon.classList.add("chevron-icon-focus");
      alterIcon_home("homeIcon", "notFill");
      alterIcon_chevronIcon("fill");
      headerAdjust("noShow");
      SecundarySection("show");
    }

    function alterIcon_chevronIcon(mode) {
      const svg = document.getElementById("chevronIcon");
      const paths = svg.querySelectorAll("path");

      if (mode === "fill") {
        const sectionAbout = document.getElementById('section-about');
        sectionAbout.scrollIntoView({ behavior: 'smooth' });

        paths[0].setAttribute("fill", "");
        paths[1].setAttribute("fill", "none");
        paths[1].setAttribute("stroke", "#000");
      } else if (mode === "notFill") {
        paths[0].setAttribute("fill", "none");
        paths[1].setAttribute("fill", "none");
        paths[1].setAttribute("stroke", "#fafafa");
      } else {
        console.error("Ação não reconhecida.");
      }
    }

    function alterIcon_home(svgId, mode) {
      navSectionMainSvgs.forEach(svg => svg.classList.remove('visible'));

      const svg = document.getElementById(svgId);
      const paths = svg.querySelectorAll("path");
      paths.forEach((path) => {
        if (mode === "fill") {
          path.setAttribute("fill", "currentColor");
        } else if (mode === "notFill") {
          path.removeAttribute("fill");
        }
      });
    }

    function SecundarySection(show_icon) {
      const firstSection = navSectionMainSvgs[0];
      navSectionMainSvgs.forEach(section => section.classList.remove('focus'));

      firstSection.classList.add('focus');
      if (show_icon === 'show') {      
        navSectionMainSvgs.forEach(svg => {
          svg.classList.add('visible');
        });
      }
    }

    function headerAdjust(show) {
      const header = document.getElementById("header");

      if (show === "noShow") {
        if (!header.classList.contains("header-no-show")) {
          header.classList.add("header-no-show");
        }
      } else {
        if (header.classList.contains("header-no-show")) {
          header.classList.remove("header-no-show");
        }
      }
    }
  }

  function isElementInViewport(el) {
    let windowHeightAdjust = window.innerHeight * 1.15;
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (windowHeightAdjust || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  function sectionContactInView() {
    const sectionContact = document.getElementById('section-contact');
    if (isElementInViewport(sectionContact)) {
      iconSecundarySectionInFocus(sectionContact);
      // console.log('O elemento #section-contact está dentro da janela visível.');
    }
  }

  function handleScrollEvent() {
    checkSecundarySection();
    sectionContactInView();
  }

  main.addEventListener('scroll', checkSectionInView);
  sectionMain.addEventListener('scroll', handleScrollEvent);
  checkSectionInView();

  const actived = document.querySelectorAll(".active");
  actived.forEach((active) => {
    observeFunction(active.id);
  });

  document.querySelectorAll('[data-section]').forEach(svg => {
    svg.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      const section = document.getElementById(sectionId);

      section.scrollIntoView({ behavior: 'smooth' });

    });
  });

});
