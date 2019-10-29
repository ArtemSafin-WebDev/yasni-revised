import polyfills from './polyfills';
import detectTouch from './detectTouch';
import fullpage from './fullpage';
import burgerMenu from './burgerMenu';
import formScrollbar from './formScrollbar';
import schemaSlider from './schemaSlider';
import successSlider from './successSlider';
import paymentsSlider from './paymentsSlider';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    successSlider();
    schemaSlider();
    paymentsSlider();
    fullpage();
    burgerMenu();
    formScrollbar();
    
});
