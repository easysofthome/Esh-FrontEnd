define(function (require, exports, module) {
    require("jquery");
    (function ($) {
        $.fn.extend({
            switchable: function(b) {
                function c() {
                    k != f && (b.thumbObj && $(b.thumbObj).removeClass(b.thumbNowClass).eq(f).addClass(b.thumbNowClass), b.slideTime <= 0 ? (i.eq(k).hide(), i.eq(f).show()) : "fade" == b.changeType ? (i.eq(k).fadeOut(b.slideTime), i.eq(f).fadeIn(b.slideTime)) : (i.eq(k).slideUp(b.slideTime), i.eq(f).slideDown(b.slideTime)), k = f);
                }

                function d() {
                    f = (k + 1) % j, c();
                }

                b = $.extend({
                    thumbObj: null,
                    botPrev: null,
                    botNext: null,
                    changeType: "fade",
                    thumbNowClass: "now",
                    thumbOverEvent: !0,
                    slideTime: 1e3,
                    autoChange: !0,
                    clickFalse: !0,
                    overStop: !0,
                    changeTime: 5e3,
                    delayTime: 300
                }, b || {});
                var e,
                    f,
                    g,
                    h,
                    i = $(this),
                    j = i.size(),
                    k = 0;
                i.hide().eq(0).show(), b.thumbObj && (e = $(b.thumbObj), e.removeClass(b.thumbNowClass).eq(0).addClass(b.thumbNowClass), e.click(function() {
                    return f = e.index($(this)), c(), b.clickFalse ? !1 : void 0
                }), b.thumbOverEvent && e.hover(function() {
                    f = e.index($(this)), h = setTimeout(c, b.delayTime)
                }, function() {
                    clearTimeout(h);
                })), b.botNext && $(b.botNext).click(function() {
                    return i.queue().length < 1 && d(), !1
                }), b.botPrev && $(b.botPrev).click(function() {
                    return i.queue().length < 1 && (f = (k + j - 1) % j, c()), !1
                }), b.autoChange && (g = setInterval(d, b.changeTime), b.overStop && i.add(b.thumbObj).hover(function() {
                    clearInterval(g);
                }, function() {
                    g = setInterval(d, b.changeTime);
                }));
            }
        });
    })(jQuery);
});