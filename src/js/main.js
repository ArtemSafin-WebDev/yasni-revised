import polyfills from './polyfills';
import detectTouch from './detectTouch';
import fullpage from './fullpage';
import burgerMenu from './burgerMenu';
import formScrollbar from './formScrollbar';
import schemaSlider from './schemaSlider';
import successSlider from './successSlider';
import paymentsSlider from './paymentsSlider';
import documentsSlider from './documentsSlider';
import smoothScrollToForm from './smoothScrollToForm';
import yandexMaps from './yandexMaps';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    successSlider();
    documentsSlider();
    schemaSlider();
    paymentsSlider();
    yandexMaps();
    fullpage();
    burgerMenu();
    formScrollbar();
    smoothScrollToForm();
});
