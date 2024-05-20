var main = document.getElementById("main");
var galleries = document.querySelectorAll(".gallery");

main.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;

  galleries.forEach(function (gallery, index) {
    var galleryOffset = gallery.offsetTop;
    var galleryHeight = gallery.offsetHeight;

    if (
      scrollPosition >= galleryOffset &&
      scrollPosition < galleryOffset + galleryHeight
    ) {
      gallery.style.transform = `translateY(-${scrollPosition - galleryOffset}px)`;
    } else {
      gallery.style.transform = `translateY(0)`;
    }
  });
});
