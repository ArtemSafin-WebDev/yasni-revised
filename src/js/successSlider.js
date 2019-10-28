import Swiper from 'swiper';

export default function() {
    let successSlider = document.querySelector('.js-success-slider');

    const main = successSlider.querySelector('.js-success-slider-main');
    const thumbs = successSlider.querySelector('.js-success-slider-thumbs');

    const mainContainer = main.querySelector('.swiper-container');
    const thumbsContainer = thumbs.querySelector('.swiper-container');

    const mainSliderOptions = {
        navigation: {
            prevEl: main.querySelector('.success__links-slider-main-arrows-btn--prev'),
            nextEl: main.querySelector('.success__links-slider-main-arrows-btn--next')
        },
        thumbs: {}
    };

    const thumbsSliderOptions = {
        slidesPerView: 5,
        spaceBetween: 20,
        threshold: 10,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        centerInsufficientSlides: true,
        breakpoints: {
            769: {
                slidesPerView: 7,
                spaceBetween: 40
            }
        }
    };

    mainSliderOptions.thumbs.swiper = new Swiper(thumbsContainer, thumbsSliderOptions);

    const successSliderInstance = new Swiper(mainContainer, mainSliderOptions);

    const detailsSlider = document.querySelector('.js-history-details-slider');

    let detailsSwiperInstance = null;
    const detailsContainer = detailsSlider.querySelector('.swiper-container');
    const detailsOptions = {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        watchOverflow: true,
        navigation: {
            prevEl: detailsSlider.querySelector('.success__history-details-slider-arrow-btn--prev'),
            nextEl: detailsSlider.querySelector('.success__history-details-slider-arrow-btn--next')
        },
        pagination: {
            el: detailsSlider.querySelector('.js-history-details-pagination'),
            type: 'fraction',
            formatFractionCurrent: number => (number.toString().length === 1 && number !== 0 ? '0' + number : number),
            formatFractionTotal: number => (number.toString().length === 1 && number !== 0 ? '0' + number : number)
        }
    };

    const widthChange = mq => {
        if (detailsSwiperInstance) {
            detailsSwiperInstance.destroy();
            detailsSwiperInstance = null;
            detailsOptions.autoHeight = window.matchMedia('(max-width: 768px)') ? true : false;
            detailsSwiperInstance = new Swiper(detailsContainer, detailsOptions);

            successSliderInstance.controller.control = detailsSwiperInstance;
            detailsSwiperInstance.controller.control = successSliderInstance;
        } else {
            detailsOptions.autoHeight = window.matchMedia('(max-width: 768px)') ? true : false;
            detailsSwiperInstance = new Swiper(detailsContainer, detailsOptions);
            successSliderInstance.controller.control = detailsSwiperInstance;
            detailsSwiperInstance.controller.control = successSliderInstance;
        }
    };

    if (matchMedia) {
        const mq = window.matchMedia('(max-width: 768px)');
        mq.addListener(widthChange);
        widthChange(mq);
    }
}
