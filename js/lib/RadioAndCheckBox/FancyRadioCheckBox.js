/*
美化单选框、复选框
*/
define(function (require, exports, module) {

    require("jquery");
    require('./skin/blue/blue.css');
    var init = function (selector) {
         $('body').addClass('has-js');
        if(selector){
            selector.find('.label_check').click(function () {
                var that = this;
                setupLabel(that);
            });
        }else{
             $('.label_check, .label_radio').click(function () {
                setupLabel();
            });
        }
    };

    function setupLabel(that) {
        if(that){
            var $checkbox = $(that).children('input[type=checkbox]');
            if($checkbox.attr('checked')){
                $(that).removeClass('c_on');
            }else{
                $(that).addClass('c_on');
            }
        }
        if ($('.label_radio input').length) {
            $('.label_radio').each(function () {
                $(this).removeClass('r_on');
            });
            $('.label_radio input:checked').each(function () {
                $(this).parent('label').addClass('r_on');
            });
        };
    };

    $(function () {

        init();
    });
    exports.init = init;

});


