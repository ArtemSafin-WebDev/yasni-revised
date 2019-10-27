export default function() {
    const introNavLinks = Array.from(document.querySelectorAll('.intro__nav-block-link'));
    const introImageLinks = Array.from(document.querySelectorAll('.intro__maps-block-card-image-link'));


    introNavLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            link.classList.add('active');
            if (link.hasAttribute('data-image')) {
                const imageLink = introImageLinks.find(element => element.matches(`[data-link="${link.getAttribute('data-image')}"]`));
                if (imageLink) {
                    imageLink.classList.add('active');
                }
            }
        });
        link.addEventListener('mouseleave', function() {
            link.classList.remove('active');
            if (link.hasAttribute('data-image')) {
                const imageLink = introImageLinks.find(element => element.matches(`[data-link="${link.getAttribute('data-image')}"]`));
                if (imageLink) {
                    imageLink.classList.remove('active');
                }
            }
        });
    })



    introImageLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            link.classList.add('active');
            if (link.hasAttribute('data-link')) {
                const navLink = introNavLinks.find(element => element.matches(`[data-image="${link.getAttribute('data-link')}"]`));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
        link.addEventListener('mouseleave', function() {
            link.classList.remove('active');
            if (link.hasAttribute('data-link')) {
                const navLink = introNavLinks.find(element => element.matches(`[data-image="${link.getAttribute('data-link')}"]`));
                if (navLink) {
                    navLink.classList.remove('active');
                }
            }
        });
    })


    
}