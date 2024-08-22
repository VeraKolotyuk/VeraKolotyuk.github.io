// Test import of a JavaScript module
import { example } from '@/js/example'


// Test import of styles
import '@/styles/index.scss'

const animatedEls = document.querySelectorAll(".js-animation");

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		//const animation = entry.target.getAttribute("data-animation");

		if (entry.isIntersecting) {
      if (entry.target.id == 'sm-calendar') {
        // anime({
        //   targets: '#sm-calendar',
        //   width: '100%', // -> from '28px' to '100%',
        //   easing: 'easeInOutQuad',
        //   direction: 'alternate',
        //   loop: false
        // });
      } else if (entry.target.classList.contains('js-animation-slide')) {
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
      } else if (entry.target.classList.contains('articles')) {
        const test = new Letterize({
          targets: ".articles h3 span"
        });

        var animation = anime.timeline({
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



// import { inView, animate } from "motion";

// inView("section", ({ target }) => {
//   target.querySelectorAll(".js-animation").forEach((el) => {
//     animate(
//       el,
//       { opacity: 1, transform: "none" },
//       { delay: 0.2, duration: 0.9, easing: [0.17, 0.55, 0.55, 1] }
//     );
//   });
// });
  

import Letterize from 'letterizejs';
import anime from 'animejs/lib/anime.es.js';


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