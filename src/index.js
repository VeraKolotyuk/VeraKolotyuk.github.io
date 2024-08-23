import Letterize from 'letterizejs';
import anime from 'animejs/lib/anime.es.js';
import '@/styles/index.scss';

const animatedEls = document.querySelectorAll(".js-animation");

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
      if (entry.target.classList.contains('js-animation-slide')) {
        anime({
          targets: '.js-animation-slide',
          easing: 'easeOutCubic',
          translateY: [150, 0],
          duration: 1000
        });
      } else if (entry.target.classList.contains('js-animation-fade')) {
        anime({
          targets: '.js-animation-fade',
          opacity: [0, 1],
          easing: 'easeInOutQuad',
          duration: 1000
        });
      } else if (entry.target.classList.contains('js-articles')) {
        const test = new Letterize({
          targets: ".js-articles h3 span"
        });

        const animation = anime.timeline({
          targets: test.listAll,
          delay: anime.stagger(50),
          loop: false
        });

        animation
          .add({
            translateX: [140, 0]
          })
      }
			entry.target.classList.add('scroll-animation');
		} else {
			entry.target.classList.remove('scroll-animation');
		}
	});
});

animatedEls.forEach((el) => observer.observe(el));
  
anime({
  targets: '#main-info ul li',
  translateX: [450, 0],
  scale: [.75, .9],
  delay: function(el, index) {
    return index * 80;
  },
  direction: 'alternate',
  loop: false
});