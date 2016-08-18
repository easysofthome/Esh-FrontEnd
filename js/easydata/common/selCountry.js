define(function (require, exports, module) {
    var $exports = $(exports);
    module.exports.bind = function (events,fn) {
        $exports.bind(events, fn);
    };
    require('jquery');
    // 初始化显示
    $('.country ol:eq(0)').addClass('cur').show();
    $('.continent li:eq(0)').addClass('cur').show();
    // 隐藏选择国家
    $('body').on('click', function(e) {
        e = window.event || e; // 兼容IE7
        $('.clicked').removeClass('clicked');
        $(e.srcElement || e.target).addClass('clicked');
        var flag = $('#sel-country').hasClass('clicked');
        if($('#sel-country .clicked').length == 0 && !flag){
            $('.sel-country').hide();
            $('#sel-country .input-tri[tri-state=cur]').toggleClass('toggleTri');
        }
    });
    //选择国家
    $('#sel-country input').on('click', function () {
        $('.sel-country').show();
        $('[tri-state=cur]').attr('tri-state','')
        $('#sel-country .input-tri').attr('tri-state','cur').toggleClass('toggleTri');
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