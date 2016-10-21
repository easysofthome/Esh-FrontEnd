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
                return false;
            });
        }else{
             $('.label_check, .label_radio').click(function () {
                var that = this;
                setupLabel(that);
                return false;
            });
        }
    };

    function setupLabel(that) {
        var tag = $(that).find('input').attr('type');
        tag = tag=='radio'?'r_on':'c_on';
        if(tag){
            var isChecked = $(that).hasClass(tag);
            if(isChecked){
                $(that).removeClass(tag);
            }else{
                $(that).addClass(tag);
            }
        }

    };
    exports.init = init;

});


