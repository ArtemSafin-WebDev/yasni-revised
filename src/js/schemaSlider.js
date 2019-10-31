import Swiper from 'swiper';
import { MOBILE_WIDTH } from './constants';

export default function() {
    const schemaSliders = Array.from(document.querySelectorAll('.js-schema-slider'));

    schemaSliders.forEach(block => {
        let swiperInstance = null;
        const container = block.querySelector('.swiper-container');
        const schemaSteps = block.querySelector('.js-schema-steps-list');
        const options = {
            slidesPerView: 1,
            watchOverflow: true,
            init: false,
            navigation: {
                nextEl: block.querySelector('.schema__steps-slider-arrow-btn--next'),
                prevEl: block.querySelector('.schema__steps-slider-arrow-btn--prev')
            }
        };


        function initializeSwiper(mq) {
            options.autoHeight = mq.matches ? true : false;
            swiperInstance = new Swiper(container, options);
            let steps = [];
            

            swiperInstance.on('init', function() { 
                const slidesCount = swiperInstance.slides.length;
                const currentIndex = swiperInstance.activeIndex;
                const stepElementTemplate = (index) => `
                    
                        <span class="schema__steps-bullet-square">
                            <span class="schema__steps-bullet-inner-square">
                            </span>
                        </span>
                        Шаг ${index + 1}
                    
                `;

                for (let i = 0; i < slidesCount; i++) {
                    const span = document.createElement('span');
                    span.className = 'schema__steps-bullet';
                    span.innerHTML = stepElementTemplate(i);
                    steps.push(span);
                }

                steps.forEach((step, index) => {
                    step.addEventListener('click', function() {
                        swiperInstance.slideTo(index);
                    })
                    if (index === currentIndex) {
                        step.classList.add('schema__steps-bullet--active');
                    }
                    schemaSteps.appendChild(step);
                })

                
            });

            swiperInstance.on('slideChange', function() {
                const currentIndex = swiperInstance.activeIndex;
                steps.forEach((step, index) => {
                    step.classList.remove('schema__steps-bullet--active');
                    if (index <= currentIndex) {
                        step.classList.add('schema__steps-bullet--active');
                    }
                })
               
            });

            swiperInstance.init();
        }

        

        const widthChange = mq => {
            if (swiperInstance) {
                swiperInstance.destroy();
                swiperInstance = null;
                initializeSwiper(mq);
            } else {
                initializeSwiper(mq);
            }
        };

        if (matchMedia) {
            const mq = window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`);
            mq.addListener(widthChange);
            widthChange(mq);
        }
    });
}
