import Swiper from 'swiper';
import { MOBILE_WIDTH } from './constants';

export default function() {
    const documentsSliders = Array.from(document.querySelectorAll('.js-documents-slider'));
    documentsSliders.forEach(slider => {
        let swiperInstance = null;
        const container = slider.querySelector('.swiper-container');

        const options = {
            watchOverflow: true,
            navigation: {
                nextEl: slider.querySelector('.documents__slider-btn--next'),
                prevEl: slider.querySelector('.documents__slider-btn--prev')
            },
            pagination: {
                el: slider.querySelector('.js-documents-slider-pagination'),
                type: 'fraction',
                formatFractionCurrent: number => (number.toString().length === 1 && number !== 0 ? '0' + number : number),
                formatFractionTotal: number => (number.toString().length === 1 && number !== 0 ? '0' + number : number)
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
            const mq = window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`);
            mq.addListener(widthChange);
            widthChange(mq);
        }
    });
}
