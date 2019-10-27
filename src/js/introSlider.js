import Swiper from 'swiper';

export default function() {
    const introSliders = Array.from(document.querySelectorAll('.js-intro-slider'));

    introSliders.forEach(slider => {
        let swiperInstance = null;
        const container = slider.querySelector('.swiper-container');
        const options = {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            watchOverflow: true,
            navigation: {
                nextEl: slider.querySelector('.mobile-slider-nav__btn--next'),
                prevEl: slider.querySelector('.mobile-slider-nav__btn--prev')
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
