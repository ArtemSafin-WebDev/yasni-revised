import Fullpage from 'fullpage.js';
import selects from './customSelects';
import introLinks from './introLinks';
import introSlider from './introSlider';
import formValidation from './formValidation';

import PerfectScrollbar from 'perfect-scrollbar';
import innerSlides from './innerSlides';
import articleScroll from './articleScroll';
import { MOBILE_WIDTH } from './constants';

import successSlider from './successSlider';
import calculator from './calculator';

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
        responsiveWidth: MOBILE_WIDTH + 1,
        scrollOverflow: true,
        afterRender: function() {
            // Move pagination to another location

            const dots = document.querySelector('#fp-nav');
            const dotsContainer = document.querySelector('#fullpage-dots');
            if (dots && dotsContainer) {
                dotsContainer.appendChild(dots);
            }


            // Arrow down

            const downArrow = document.querySelector('.next-slide-btn');

            if (downArrow) {
                downArrow.addEventListener('click', function() {
                    fullpageSlider.moveSectionDown();
                })
            }

            // Logo link

            const logo = document.querySelector('.logo');
            if (logo) {
                logo.addEventListener('click', function(event) {
                    console.log('Logo click')
                    event.preventDefault();
                    fullpageSlider.moveTo(1);
                })
            }

            // Slides scrolling

            const slides = Array.from(document.querySelectorAll('.js-slide-scrolling'));


            if (document.body.classList.contains('no-touch')) {
                slides.forEach(slide => {
                    const ps = new PerfectScrollbar(slide, {
                        wheelPropagation: false,
                        maxScrollbarLength: 160,
                        scrollXMarginOffset: 2
                    })
    
                    slide.addEventListener('ps-y-reach-start', function() {
                        console.log('reaced start')
                        fullpageSlider.moveSectionUp()
                    })
                    slide.addEventListener('ps-y-reach-end', function() {
                        console.log("Reached end")
                        fullpageSlider.moveSectionDown()
                    })
                })
            }
            

            // Custom selects

            selects();

            // Intro links

            introLinks();

            // Intro slider

            introSlider();

            // Form validation

            formValidation();

            // inner slides

            innerSlides();

            // Article scroll

            articleScroll();
    
            // Success slider

            successSlider();

            // Calculator

            calculator();
            
        },
        afterLoad: isHomeSlide,
        onLeave: isHomeSlide
    })
}