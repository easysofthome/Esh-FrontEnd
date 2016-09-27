define(function (require, exports, module) {

    var $exports = $(exports);
    module.exports.bind = function (events,fn) {
        $exports.bind(events, fn);
    };
    require('jquery');

    var hideDiv = function (obj) {
        // 隐藏选择国家
        $('body').on('click', function(e) {
            e = window.event || e; // 兼容IE7
            $('.clicked').removeClass('clicked');
            $(e.srcElement || e.target).addClass('clicked');
            var flag = obj.hasClass('clicked');
            if(obj.find('.clicked').length == 0 && !flag){
                obj.find('.sel-country').hide();
                obj.find('.input-tri[tri-state=cur]').removeClass('toggleTri');
            }
        });
    };
    var bindEvent = function (obj) {
        //选择国家
        obj.on('click', 'input', function () {
            obj.find('.sel-country').show();
            obj.find('[tri-state=cur]').attr('tri-state','')
            obj.find('.input-tri').attr('tri-state','cur').addClass('toggleTri');
        });
        obj.find('.continent li').on('mouseover', function () {
            $(this).parent().find('.cur').removeClass('cur');
            $(this).addClass('cur');
            obj.find('.country-ol').hide();
            obj.find('.country-ol').eq($(this).index()).show();
        });
        obj.find('.country-ol li').click(function (event) {
            var html = $.trim($(this).html());
            obj.find('input').val(html);
            obj.find('.sel-country').hide();
            $exports.trigger('beforeClick', html);
        });
    }

    function init (obj) {
        // 初始化显示
        $('.country ol:eq(0)').addClass('cur').show();
        $('.continent li:eq(0)').addClass('cur').show();

        hideDiv(obj);
        bindEvent(obj);
    }

    init($('#sel-country'));
    init($('#sel-from-country'));
});