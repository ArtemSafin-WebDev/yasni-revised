import IScrollZoom from 'iscroll/build/iscroll-zoom';
import { MOBILE_WIDTH } from './constants';


export default function() {
    const wrapper = document.querySelector('#interactive-map');

    if (!wrapper) return;
    // if (window.matchMedia(`(min-width: ${MOBILE_WIDTH}px)`).matches) return;

    window.addEventListener('load', function() {
        new IScrollZoom(wrapper, {
            scrollX: true,
            scrollY: true,
            freeScroll: true,
            startX: 0,
            startY: -100,
            bounce: false,
            zoom: true,
            click: true,
            zoomMax: 2,
            deceleration: 0.009,
            mouseWheel: true,
            wheelAction: 'zoom'
        });
    })

    
}