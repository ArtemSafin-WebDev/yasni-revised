import PerfectScrollbar from 'perfect-scrollbar';

export default function() {
    const forms = Array.from(document.querySelectorAll('.js-form-scrollbar'));
    forms.forEach(form => {
        new PerfectScrollbar(form, {
            wheelPropagation: false,
            maxScrollbarLength: 160
        });
    })
}