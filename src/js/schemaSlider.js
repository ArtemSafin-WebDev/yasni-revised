import Swiper from 'swiper';

export default function() {
    const schemaSliders = Array.from(document.querySelectorAll('.js-schema-slider'));

    schemaSliders.forEach(block => {
        let swiperInstance = null;
        const container = block.querySelector('.swiper-container');
        const options = {
            slidesPerView: 1,
            watchOverflow: true,
            navigation: {
                nextEl: block.querySelector('.schema__steps-slider-arrow-btn--next'),
                prevEl: block.querySelector('.schema__steps-slider-arrow-btn--prev')
            },
            pagination: {
                el: block.querySelector('.schema__steps-pagination-indication'),
                type: 'bullets',
                renderBullet: function (index, className) {
                    console.log(className);
                    return `
                        <span class="${className}">
                            <span class="schema__steps-bullet-square">
                                <span class="schema__steps-bullet-inner-square">
                                </span>
                            </span>
                            Шаг ${index + 1}
                        </span>
                    `;
                },
                bulletClass: 'schema__steps-bullet',
                bulletActiveClass: 'schema__steps-bullet--active',
                clickable: true
            }
        };
        
    
        const widthChange = mq => {
            if (swiperInstance) {
                swiperInstance.destroy();
                swiperInstance = null;
                options.autoHeight = mq.matches ? true : false;
                swiperInstance = new Swiper(container, options);
            } else {
                options.autoHeight = mq.matches ? true : false;
                swiperInstance = new Swiper(container, options);
            }
        };
    
        if (matchMedia) {
            const mq = window.matchMedia('(max-width: 768px)');
            mq.addListener(widthChange);
            widthChange(mq);
        }
    })
}