import PerfectScrollbar from 'perfect-scrollbar';

export default function() {
    const articleScrollContainers = Array.from(document.querySelectorAll('.js-article-scroll'));
    if (document.body.classList.contains('is-touch') || window.matchMedia("(max-width: 768px)").matches) return;
    articleScrollContainers.forEach(article => {
        new PerfectScrollbar(article, {
            wheelPropagation: false,
            maxScrollbarLength: 200
        })
    })
}