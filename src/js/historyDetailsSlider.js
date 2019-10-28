import Swiper from 'swiper';

export default function() {
    const historyDetailsSlider = Array.from(document.querySelectorAll('.js-history-details-slider'));
    historyDetailsSlider.forEach(slider => {
        let swiperInstance = null;
        const container = slider.querySelector('.swiper-container');
        const options = {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            watchOverflow: true,
            navigation: {
                prevEl: slider.querySelector('.success__history-details-slider-arrow-btn--prev'),
                nextEl: slider.querySelector('.success__history-details-slider-arrow-btn--next')
            },
            pagination: {
                el: slider.querySelector('.js-history-details-pagination'),
                type: 'fraction',
                formatFractionCurrent: number => (number.toString().length === 1 && number !== 0 ? '0' + number : number),
                formatFractionTotal: number => (number.toString().length === 1 && number !== 0 ? '0' + number : number)
            }
        };

        const widthChange = mq => {
            if (swiperInstance) {
                swiperInstance.destroy();
                swiperInstance = null;
                options.autoHeight = window.matchMedia('(max-width: 768px)') ? true : false;
                swiperInstance = new Swiper(container, options);
            } else {
                options.autoHeight = window.matchMedia('(max-width: 768px)') ? true : false;
                swiperInstance = new Swiper(container, options);
            }
        };

        if (matchMedia) {
            const mq = window.matchMedia('(max-width: 768px)');
            mq.addListener(widthChange);
            widthChange(mq);
        }
    });
}
