import Swiper from 'swiper';

export default function() {
    let successSliders = Array.from(document.querySelectorAll('.js-success-slider'));

    successSliders.forEach(block => {
        const main = block.querySelector('.js-success-slider-main');
        const thumbs = block.querySelector('.js-success-slider-thumbs');

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
            // centeredSlides: true,
            spaceBetween: 20,
            threshold: 10,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            centerInsufficientSlides: true,
            breakpoints: {
                
                769: {
                    slidesPerView: 7,
                    spaceBetween: 40,
                }
            }
        };

        mainSliderOptions.thumbs.swiper = new Swiper(thumbsContainer, thumbsSliderOptions);

        new Swiper(mainContainer, mainSliderOptions);
    });
}
