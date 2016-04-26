define(function (require, exports, module) {
    require('js/lib/jquery.switchable/jquery.switchable');
    var lightbox = require('lightbox');
    var photoTem = require('./InfoTmpl/DesignTmpl');
    var isinit = false;
    exports.photo = function (options) {
        // $('.wrap').on('click', '.openPhoto', function (e) {
        $('.openPhoto').on('click',  function (e) {
        // $(window).load( function (e) {
            window.LBConfig = {
                url: options.url,
                pageNum: options.pageNum,
                pageView: options.pageView,
                listDataType: $(this).attr("data-type"),
                data: $(this).attr("data"),
                mode: options.mode
            };
            if (!isinit) {
                isinit = true;
                var tmplRenderFn = photoTem.initTmpl(window.LBConfig.listDataType);
                lightbox.init(tmplRenderFn);
            }
            e.preventDefault();
            var picId = $(this).attr('data-picid');
            lightbox.start(picId);

        });
    };

    $(function () {
        $(".litab").each(function (index) {
            var $showDiv = $(".isshowbyli");
            $(this).click(function () {
                var $thisObj = $(this);
                if ($thisObj.className == "active") return;
                $thisObj.addClass("active").siblings("li").removeClass("active").addClass("normal");

                var $amore = $thisObj.parent().siblings(".mores").find(".amoretab");
                if (!$amore || $amore.length < 1) {
                    $amore = $thisObj.parent().parent().prev().find(".amoretab");
                }
                $amore.attr("href", $thisObj.attr("data-moreurl"));
                $($showDiv[index]).show().siblings(".isshowbyli").hide();
            });
        });
    });

});