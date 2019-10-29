import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { MOBILE_WIDTH } from './constants';

export default function() {
    console.log('hello');
    const menuOpenBtn = document.querySelector('.js-menu-open');
    const menuCloseBtn = document.querySelector('.js-menu-close');
    const menu = document.querySelector('.js-main-nav');
    const menuLinks = Array.from(menu.querySelectorAll('.main-nav__link, .main-nav__send-application'));
    let menuOpen = false;

    function openBurgerMenu() {
        menuOpen = true;
        disableBodyScroll(menu);
        document.body.classList.add('burger-shown');
    }

    function closeBurgerMenu() {
        menuOpen = false;
        enableBodyScroll(menu);
        document.body.classList.remove('burger-shown');
    }

    menuOpenBtn.addEventListener('click', function(event) {
        console.log('click');
        event.preventDefault();
        openBurgerMenu();
    });
    menuCloseBtn.addEventListener('click', function(event) {
        event.preventDefault();
        closeBurgerMenu();
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeBurgerMenu();
        });
    });

    const widthChange = mq => {
        if (!mq.matches) {
            if (menuOpen) {
                closeBurgerMenu();
            }
        }
    };

    if (matchMedia) {
        const mq = window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`);
        mq.addListener(widthChange);
        widthChange(mq);
    }
}
