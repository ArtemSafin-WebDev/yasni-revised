import jump from 'jump.js'

export default function() {
    const anchors = Array.from(document.querySelectorAll('.js-anchor'));
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const hash = this.hash;
            const element = document.querySelector(hash);
            if (element) {
                jump(element, {
                    offset: -115
                })
            }
        })
    })
}