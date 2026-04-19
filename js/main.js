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

// Mouse blobs
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var b1 = document.createElement('div');
  b1.className = 'blob blob--1';
  var b2 = document.createElement('div');
  b2.className = 'blob blob--2';
  document.body.insertBefore(b1, document.body.firstChild);
  document.body.insertBefore(b2, document.body.firstChild);

  var mx = window.innerWidth / 2, my = window.innerHeight / 2;
  var x1 = mx, y1 = my, x2 = mx, y2 = my;

  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });

  function lerp(a, b, t) { return a + (b - a) * t; }

  (function frame() {
    x1 = lerp(x1, mx, 0.035);
    y1 = lerp(y1, my, 0.035);
    x2 = lerp(x2, mx, 0.1);
    y2 = lerp(y2, my, 0.1);
    b1.style.transform = 'translate(' + x1 + 'px,' + y1 + 'px)';
    b2.style.transform = 'translate(' + x2 + 'px,' + y2 + 'px)';
    requestAnimationFrame(frame);
  }());
})();

// Hero role typewriter: Product Designer → Front-End Engineer → both
(function () {
  var el = document.querySelector('.hero-role');
  if (!el) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var phrases = ['Product Designer', 'Front-End Engineer'];
  var textSpan = document.createElement('span');
  var cursorSpan = document.createElement('span');
  cursorSpan.className = 'hero-role__cursor';
  cursorSpan.setAttribute('aria-hidden', 'true');
  cursorSpan.style.height = '0.85em';
  el.textContent = '';
  el.setAttribute('aria-label', 'Product Designer / Front-End Engineer');
  el.appendChild(textSpan);
  el.appendChild(cursorSpan);

  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;

  function tick() {
    var phrase = phrases[phraseIndex];
    var isFinal = phraseIndex === phrases.length - 1;

    if (!isDeleting) {
      charIndex++;
      textSpan.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        setTimeout(function () {
          if (isFinal) { phraseIndex = 0; charIndex = 0; setTimeout(tick, 65); return; }
          isDeleting = true;
          setTimeout(tick, 30);
        }, isFinal ? 4000 : 2000);
        return;
      }
    } else {
      charIndex--;
      textSpan.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        setTimeout(tick, 280);
        return;
      }
    }

    setTimeout(tick, isDeleting ? 30 : 65);
  }

  setTimeout(tick, 700);
})();
