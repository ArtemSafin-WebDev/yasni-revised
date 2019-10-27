import Fullpage from 'fullpage.js';
import selects from './customSelects';
import introLinks from './introLinks';


export default function() {


    function isHomeSlide(origin, destination, direction) {
        if (destination.anchor === 'intro') {
            document.body.classList.add('on-intro-slide');
        } else {
            document.body.classList.remove('on-intro-slide');
        }
    }

    const fullpageSlider = new Fullpage('#fullpage', {
        navigation: true,
        paddingTop: '10rem',
        menu: '#fullpage-menu',
        responsiveWidth: 768.5,
        // scrollOverflow: true,
        afterRender: function() {
            // Move pagination to another location

            const dots = document.querySelector('#fp-nav');
            const dotsContainer = document.querySelector('#fullpage-dots');
            if (dots && dotsContainer) {
                dotsContainer.appendChild(dots);
            }

            // Custom selects

            selects();

            // Intro links

            introLinks();
        },
        afterLoad: isHomeSlide,
        onLeave: isHomeSlide
    })
}