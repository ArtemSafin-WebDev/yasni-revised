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
        }


        const thumbsSliderOptions = {
            slidesPerView: 7,
            // centeredSlides: true,
            spaceBetween: 40,
            threshold: 10,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        }


        mainSliderOptions.thumbs.swiper = new Swiper(thumbsContainer, thumbsSliderOptions);

        new Swiper(mainContainer, mainSliderOptions);

        
    })
}