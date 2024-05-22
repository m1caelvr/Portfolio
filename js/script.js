// const main = document.getElementById("main");
// const sections = document.querySelectorAll(".section");

// main.addEventListener("scroll", checkSectionInView);
// window.addEventListener("load", checkSectionInView);

// function checkSectionInView() {
//   const scrollPosition = main.scrollTop;
//   console.log(scrollPosition);

//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop;
//     const sectionBottom = sectionTop + section.offsetHeight;

//     if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
//       section.classList.add("active");
//       observeFunction(section.id);
//     } else {
//       section.classList.remove("active");
//     }
//   });
// }

function detectarSeccaoEmFoco() {
  const secoes = document.querySelectorAll('main > section');

  document.querySelector('main').addEventListener('scroll', function() {
    let seccaoEmFoco = null;

    secoes.forEach(secao => {
      const retangulo = secao.getBoundingClientRect();
      if (
        retangulo.top >= 0 &&
        retangulo.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      ) {
        seccaoEmFoco = secao;
      }
    });

    if (seccaoEmFoco) {
      const sectionInFocus = seccaoEmFoco.id; // Assume que a seção só tem uma classe
      observeFunction(sectionInFocus)
      console.log('Seção em foco:', sectionInFocus);
    }
  });
}

document.addEventListener('DOMContentLoaded', detectarSeccaoEmFoco);

function observeFunction(i) {
  const chevronIcon = document.getElementById("chevronIcon");
  if (i === "section-landing") {
    toggleFill("homeIcon", "fill");
    alterarFillIcon("notFill");
    headerAdjust("show");
    if (chevronIcon.classList.contains("chevron-icon-focus")) {
      chevronIcon.classList.remove("chevron-icon-focus");
    }
  } else if (i === "section-main") {
    chevronIcon.classList.add("chevron-icon-focus");
    toggleFill("homeIcon", "notFill");
    alterarFillIcon("fill");
    headerAdjust("noShow");
  }
}
const actived = document.querySelectorAll(".active");
actived.forEach((active) => {
  observeFunction(active);
});

function alterarFillIcon(i) {
  var svg = document.getElementById("chevronIcon");
  var paths = svg.querySelectorAll("path");

  if (i === "fill") {
    paths[0].setAttribute("fill", "");
    paths[1].setAttribute("fill", "none");
    paths[1].setAttribute("stroke", "#000");
  } else if (i === "notFill") {
    paths[0].setAttribute("fill", "none");
    paths[1].setAttribute("fill", "none");
    paths[1].setAttribute("stroke", "#fafafa");
  } else {
    console.error("Ação não reconhecida.");
  }
}

function toggleFill(svgId, mode) {
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

function headerAdjust(i) {
  const header = document.getElementById("header");

  if (i === "noShow") {
    if (!header.classList.contains("header-no-show")) {
      header.classList.add("header-no-show");
    }
  } else {
    if (header.classList.contains("header-no-show")) {
      header.classList.remove("header-no-show");
    }
  }
}
