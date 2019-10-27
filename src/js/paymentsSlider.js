import Swiper from 'swiper';

export default function() {
    const paymentsSliders = Array.from(document.querySelectorAll('.js-payments-slider'));

    paymentsSliders.forEach(slider => {
        let swiperInstance = null;
        const container = slider.querySelector('.swiper-container');

        const options = {
            watchOverflow: true,
            slidesPerGroup: 2,
            slidesPerView: 2,
            navigation: {
                nextEl: slider.querySelector('.payments__slider-btn--next'),
                prevEl: slider.querySelector('.payments__slider-btn--prev')
            },
            spaceBetween: 20,
            breakpoints: {
                768: {
                    spaceBetween: 40
                }
            }
        };

        function mountSlider() {
            if (!swiperInstance) {
                swiperInstance = new Swiper(container, options);
            }
        }

        function unmountSlider() {
            if (swiperInstance) {
                swiperInstance.destroy();
                swiperInstance = null;
            }
        }

        const widthChange = mq => {
            if (mq.matches) {
                mountSlider();
            } else if (!mq.matches) {
                unmountSlider();
            }
        };

        if (matchMedia) {
            const mq = window.matchMedia('(max-width: 768px)');
            mq.addListener(widthChange);
            widthChange(mq);
        }
    });
}
