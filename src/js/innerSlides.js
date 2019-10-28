export default function() {
    const innerSlides = Array.from(document.querySelectorAll('.js-inner-slides'));
    
    innerSlides.forEach(slide => {
        const links = Array.from(slide.querySelectorAll(':scope .js-inner-slides-links a'));
        const slides = Array.from(slide.querySelector('.js-inner-slides-items').children);
        const navigationBlock = slide.querySelector('.js-inner-slides-navigation');
        const closeBtns = Array.from(slide.querySelectorAll('.js-inner-slide-close'));

        links.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                if (this.hasAttribute('data-slide-to')) {
                    const slideTo = this.getAttribute('data-slide-to');
                    const slide = slides.find(element => element.matches(`[data-slide="${slideTo}"]`));
                    if (slide) {
                        slides.forEach(slide => slide.classList.remove('active'));
                        navigationBlock.style.display = 'none';
                        slide.classList.add('active');
                    }
                }
            })
        })

        closeBtns.forEach(btn => {
            btn.addEventListener('click', function(event) {
                event.preventDefault();
                const slide = this.closest('.js-inner-slide');
                if (slide) slide.classList.remove('active');
                navigationBlock.style.display = '';
            })
        })
    })


    
}