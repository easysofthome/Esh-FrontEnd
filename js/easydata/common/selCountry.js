define(function (require, exports, module) {
    var $exports = $(exports);
    module.exports.bind = function (events,fn) {
        $exports.bind(events, fn);
    };
    require('jquery');
    //选择国家
    $('#sel-country').hover(function () {
        $('.sel-country').show();
    }, function () {
        $('.sel-country').hide();
    });
    $('.continent li').on('mouseover', function () {
        $(this).parent().find('.cur').removeClass('cur');
        $(this).addClass('cur');
        $('.country-ol').hide();
        $('.country-ol').eq($(this).index()).show();
    });

    $('.country-ol li').click(function (event) {
        var html = $.trim($(this).html());
        $('#sel-country input').val(html);
        $('.sel-country').hide();
        $exports.trigger('beforeClick', html);
    });
});