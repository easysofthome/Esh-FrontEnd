define(['js/lib/jquery.spinner/jquery.spinner.css', 'jquery'], function () {
    (function ($) {
        $.fn.spinner = function (opts) {
            return this.each(function () {
                var defaults = {
                    value: 0, //当前值
                    min: 0, //最小值
                    max: 999999, //最大值
                    addEvent: function () { }, //加号事件
                    cutEvent: function () { } //减号事件
                };
                var options = $.extend(defaults, opts);
                var keyCodes = { up: 38, down: 40 };
                var container = $('<div></div>');
                container.addClass('spinner');
                $(this).show();
                var textField = $(this).addClass('value').attr('maxlength', '2').val(options.value)
                    .bind('keyup paste change', function (e) {
                        var field = $(this);
                        if (e.keyCode == keyCodes.up) changeValue(1);
                        else if (e.keyCode == keyCodes.down) changeValue(-1);
                        else if (getValue(field) != container.data('lastValidValue')) validateAndTrigger(field);
                    })
                textField.wrap(container);

                var increaseButton = $('<button type="button" class="increase">+</button>').click(function () {
                    changeValue(1);
                    options.addEvent();
                });
                var decreaseButton = $('<button type="button" class="decrease">-</button>').click(function () {
                    changeValue(-1);
                    options.cutEvent();
                });

                validate(textField);
                container.data('lastValidValue', options.value);
                textField.before(decreaseButton);
                textField.after(increaseButton);

                function changeValue(delta) {
                    textField.val(getValue() + delta);
                    validateAndTrigger(textField);
                }

                function validateAndTrigger(field) {
                    clearTimeout(container.data('timeout'));
                    var value = validate(field);
                    if (!isInvalid(value)) {
                        textField.trigger('update', [field, value]);
                    }
                }

                function validate(field) {
                    var value = getValue();
                    if (value <= options.min) {
                        decreaseButton.attr('disabled', 'disabled');
                        decreaseButton.addClass('disabled');
                    } else {
                        decreaseButton.removeAttr('disabled');
                        decreaseButton.removeClass('disabled');
                    }
                    if (value >= options.max) {
                        increaseButton.attr('disabled', 'disabled');
                        increaseButton.addClass('disabled');
                    } else {
                        increaseButton.removeAttr('disabled');
                        increaseButton.removeClass('disabled');
                    }

                    field.toggleClass('invalid', isInvalid(value)).toggleClass('passive', value === 0);

                    if (isInvalid(value)) {
                        var timeout = setTimeout(function () {
                            textField.val(container.data('lastValidValue'));
                            validate(field);
                        }, 500);
                        container.data('timeout', timeout);
                    } else {
                        container.data('lastValidValue', value);
                    }
                    return value;
                }

                function isInvalid(value) { return isNaN(+value) || value < options.min; }

                function getValue(field) {
                    field = field || textField;
                    return parseInt(field.val() || 0, 10);
                }

            });
        };
    })(jQuery);
});