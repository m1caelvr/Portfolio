const sectionMain = document.getElementById('section-main');
const sections_in_sections_main = document.querySelectorAll('section#section-main > section');
const nav_section_main_svgs = document.querySelectorAll('#nav-section-main > svg');
const main = document.getElementById('main');

main.addEventListener('scroll', function () {
  checkSectionInView();
});
sectionMain.addEventListener('scroll', function () {
  checkSecundarySection();
});

checkSectionInView();
function checkSectionInView() {
  const sections_in_sections_main = document.querySelectorAll('main > section');
  const scrollPosition = main.scrollTop;

  sections_in_sections_main.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      section.classList.add("active");
      observeFunction(section.id);
    } else {
      section.classList.remove("active");
    }
  });
}

function checkSecundarySection() {
  const sectionMain = document.getElementById('section-main');
  const scrollPosition = sectionMain.scrollTop + window.innerHeight * 1.2;

  sections_in_sections_main.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      iconSecundarySectionInFocus(section);
      // console.log(section.className);
      // alterIconSecundarySection();
    }
  });

  function iconSecundarySectionInFocus(SecundarySectionInFocus) {
    const firstSection = nav_section_main_svgs[0];
    const secondSection = nav_section_main_svgs[1];
    const thirdSection = nav_section_main_svgs[2];
    const fourthSection = nav_section_main_svgs[3];
  
    nav_section_main_svgs.forEach(section => section.classList.remove('focus'));
  
    if (SecundarySectionInFocus.classList.contains('about')) {
      firstSection.classList.add('focus');
    }
    if (SecundarySectionInFocus.classList.contains('skills')) {
      secondSection.classList.add('focus');
    }
    if (SecundarySectionInFocus.classList.contains('projects')) {
      thirdSection.classList.add('focus');
    }
    if (SecundarySectionInFocus.classList.contains('contact')) {
      fourthSection.classList.add('focus');
    }
  }
}

const actived = document.querySelectorAll(".active");
actived.forEach((active) => {
  observeFunction(active);
});
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
    console.log(sections_in_sections_main.length);
    chevronIcon.classList.add("chevron-icon-focus");
    alterIcon_home("homeIcon", "notFill");
    alterIcon_chevronIcon("fill");
    headerAdjust("noShow");
    SecundarySection("show");
  }

  function alterIcon_chevronIcon(sectionId) {
    var svg = document.getElementById("chevronIcon");
    var paths = svg.querySelectorAll("path");
  
    if (sectionId === "fill") {
      paths[0].setAttribute("fill", "");
      paths[1].setAttribute("fill", "none");
      paths[1].setAttribute("stroke", "#000");
    } else if (sectionId === "notFill") {
      paths[0].setAttribute("fill", "none");
      paths[1].setAttribute("fill", "none");
      paths[1].setAttribute("stroke", "#fafafa");
    } else {
      console.error("Ação não reconhecida.");
    }
  }
  
  function alterIcon_home(svgId, mode) {
    nav_section_main_svgs.forEach(svg => {
      svg.classList.remove('visible');
    });

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
    const firstSection = nav_section_main_svgs[0];
    nav_section_main_svgs.forEach(section => section.classList.remove('focus'));
    
    firstSection.classList.add('focus');
    if (show_icon === 'show') {      
      nav_section_main_svgs.forEach(svg => {
        svg.classList.add('visible');
      });
    }
    // else {
    //   nav_section_main_svgs.forEach(svg => {
    //     svg.classList.remove('visible');
    //   });
    // }
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

