import polyfills from './polyfills';
import detectTouch from './detectTouch';
import fullpage from './fullpage';
import burgerMenu from './burgerMenu';
import formScrollbar from './formScrollbar';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    fullpage();
    burgerMenu();
    formScrollbar();
});
