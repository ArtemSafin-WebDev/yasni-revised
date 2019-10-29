import detectIt from 'detect-it';


export default function() {
    ymaps.ready(init);

    function init() {
        const maps = Array.from(document.querySelectorAll('.js-yandex-map'));

        maps.forEach(mapElement => {
            console.log(mapElement)
            const coords = mapElement.getAttribute('data-coords').split(',');

            const myMap = new ymaps.Map(mapElement, {
                center: coords,
                zoom: 17,
                controls: []
            });

            const myPlacemark = new ymaps.Placemark(
                coords,
                {},
                {
                    preset: 'islands#redCircleDotIcon'
                }
            );

            myMap.geoObjects.add(myPlacemark);

            myMap.behaviors.disable('scrollZoom');

            if (detectIt.hasTouch) {
                myMap.behaviors.disable('drag');
            }
        });
    }
}
