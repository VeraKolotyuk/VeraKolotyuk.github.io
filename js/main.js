(function () {
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var carouselRoot = document.querySelector("[data-hero-carousel]");
  if (carouselRoot) {
    var slides = carouselRoot.querySelectorAll(".hero-carousel__slide");
    if (slides.length) {
      if (prefersReduced) {
        slides.forEach(function (slide, i) {
          slide.classList.toggle("is-active", i === 0);
        });
      } else {
        var index = 0;
        var intervalMs = 4000;
        var timerId = null;

        function activate(nextIndex) {
          var next = (nextIndex + slides.length) % slides.length;
          slides[index].classList.remove("is-active");
          slides[next].classList.add("is-active");
          index = next;
        }

        function start() {
          stop();
          timerId = window.setInterval(function () {
            activate(index + 1);
          }, intervalMs);
        }

        function stop() {
          if (timerId !== null) {
            window.clearInterval(timerId);
            timerId = null;
          }
        }

        start();
        document.addEventListener("visibilitychange", function () {
          if (document.hidden) {
            stop();
          } else {
            start();
          }
        });
      }
    }
  }

  if (prefersReduced) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  nodes.forEach(function (el) {
    observer.observe(el);
  });
})();
