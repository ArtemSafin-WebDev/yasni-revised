import 'parsleyjs';
import Inputmask from 'inputmask';

export default function() {
    const phoneNumbers = Array.from(document.querySelectorAll('.js-phone-input'));

    phoneNumbers.forEach(input => {
        Inputmask({ mask: '+7 999 999 99 99' }).mask(input);
    });

    const onlyNumeric = Array.from(document.querySelectorAll('.js-only-numeric'));
    
    function setInputFilter(textbox, inputFilter) {
        ['input', 'keydown', 'keyup', 'mousedown', 'mouseup', 'select', 'contextmenu', 'drop'].forEach(function(event) {
            textbox.oldValue = '';
            textbox.addEventListener(event, function() {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty('oldValue')) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                }
            });
        });
    }

    onlyNumeric.forEach(input => {
        setInputFilter(input, function(value) {
            return /^\d*$/.test(value);
        })
    });

    window.Parsley.addValidator('phone', {
        requirementType: 'string',
        validateString: function(value) {
            return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value);
        },
        messages: {
            en: 'This value should be a mobile number',
            ru: 'Введите правильный номер мобильного телефона'
        }
    });

    window.Parsley.addValidator('production', {
        requirementType: 'string',
        validateString: function(value) {
            return value !== 'Тип производства';
        },
        messages: {
            en: 'Choose production type',
            ru: 'Выберите тип производства'
        }
    });

    Parsley.addMessages('ru', {
        defaultMessage: 'Некорректное значение.',
        type: {
            email: 'В данном поле может быть только E-mail',
            url: 'Введите URL адрес.',
            number: 'Введите число.',
            integer: 'Введите целое число.',
            digits: 'Введите только цифры.',
            alphanum: 'Введите буквенно-цифровое значение.'
        },
        notblank: 'Это поле должно быть заполнено.',
        required: 'Обязательное поле',
        pattern: 'Это значение некорректно.',
        min: 'Это значение должно быть не менее чем %s.',
        max: 'Это значение должно быть не более чем %s.',
        range: 'Это значение должно быть от %s до %s.',
        minlength: 'Это значение должно содержать не менее %s символов.',
        maxlength: 'Это значение должно содержать не более %s символов.',
        length: 'Это значение должно содержать от %s до %s символов.',
        mincheck: 'Выберите не менее %s значений.',
        maxcheck: 'Выберите не более %s значений.',
        check: 'Выберите от %s до %s значений.',
        equalto: 'Это значение должно совпадать.'
    });

    Parsley.setLocale('ru');
}
