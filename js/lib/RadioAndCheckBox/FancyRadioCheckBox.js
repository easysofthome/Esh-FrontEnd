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
        var mytag = tag=='radio'?'r_on':'c_on';
        if(tag=='checkbox'){
            var isChecked = $(that).hasClass(mytag);
            if(isChecked){
                $(that).removeClass(mytag);
            }else{
                $(that).addClass(mytag);
            }
        }else if(tag=='radio'){
            var isChecked = $(that).parent().find('.label_radio').removeClass(mytag);
            $(that).addClass(mytag);
        }

    };
    exports.init = init;

});


