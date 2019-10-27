import polyfills from './polyfills';
import detectTouch from './detectTouch';
import fullpage from './fullpage';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    fullpage();
});
