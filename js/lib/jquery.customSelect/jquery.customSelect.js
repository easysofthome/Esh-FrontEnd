define(['js/front/lib/jquery.customSelect/jquery.customSelect.css'], function () {
    (function ($) {
        'use strict';
        $.fn.extend({
            customSelect: function (options) {
                // filter out <= IE6
                if (typeof document.body.style.maxHeight === 'undefined') {
                    return this;
                }
                var defaults = {
                    customClass: 'customSelect',
                    mapClass: true,
                    mapStyle: true,
                    width: 0,
                    padding: ''
                },
                    options = $.extend(defaults, options),
                    prefix = options.customClass,
                    changed = function ($select, customSelectSpan) {
                        var currentSelected = $select.find(':selected'),
                            customSelectSpanInner = customSelectSpan.children(':first'),
                            html = currentSelected.html() || '&nbsp;';
                        customSelectSpanInner.html(html);

                        if (currentSelected.attr('disabled')) {
                            customSelectSpan.addClass(getClass('DisabledOption'));
                        } else {
                            customSelectSpan.removeClass(getClass('DisabledOption'));
                        }

                        setTimeout(function () {
                            customSelectSpan.removeClass(getClass('Open'));
                            $(document).off('mouseup.customSelect');
                        }, 60);
                    },
                    getClass = function (suffix) {
                        return prefix + suffix;
                    };

                return this.each(function () {
                    var $select = $(this),
                        customSelectInnerSpan = $('<span />').addClass(getClass('Inner')),
                         customSelectSpan = $('<span />');
                    //判断是否已经有此美化样式 如果有就不需要再次美化
                    if ($select.hasClass("hasCustomSelect")) {
                        return;
                    }
                    //解决火狐兼容性 加个div父容器
                    var wrapSelectWidth = 0;
                    var wrapSelecHeight = 0;
                    if (options.width != 0) {
                        wrapSelectWidth=options.width;
                    }

                    var $wrapSelect = $('<div id="wrapSelect_'+$select.attr('id')+'" style="position:relative;float: left;padding-right:10px;height:40px;width:'+(options.width)+'"></div>');

                    // /$('#wrapSelect_'+$select.attr('id')).width(options.width+20);
                    $select.wrap($wrapSelect);
                    $select.after(customSelectSpan.append(customSelectInnerSpan));

                    customSelectSpan.addClass(prefix);
                    if (options.mapClass) {
                        customSelectSpan.addClass($select.attr('class'));
                    }
                    if (options.mapStyle) {
                        customSelectSpan.attr('style', $select.attr('style'));
                    }

                    $select.css({'z-index':2});
                    customSelectSpan.css({'position':'absolute'});

                    $select
                        .addClass('hasCustomSelect')
                        .on('render.customSelect', function () {
                            changed($select, customSelectSpan);
                            $select.css('width', '');
                            var selectBoxWidth = parseInt($select.outerWidth(), 10) -
                            (parseInt(customSelectSpan.outerWidth(), 10) -
                                parseInt(customSelectSpan.width(), 10)) + 20;

                            // Set to inline-block before calculating outerHeight

                            if (options.width != 0) {
                                customSelectSpan.width(options.width);
                            }
                            if (options.padding != "") {
                                customSelectSpan.css({ padding: options.padding });
                            }
                            customSelectSpan.css({
                                display: 'inline-block'
                            });

                            var selectBoxHeight = customSelectSpan.outerHeight();

                            // alert(selectBoxHeight);
                            if ($select.attr('disabled')) {
                                customSelectSpan.addClass(getClass('Disabled'));
                            } else {
                                customSelectSpan.removeClass(getClass('Disabled'));
                            }

                            customSelectInnerSpan.css({
                                width: selectBoxWidth,
                                display: 'inline-block'
                            });

                            $select.css({
                                '-webkit-appearance': 'menulist-button',
                                width: customSelectSpan.outerWidth(),
                                position: 'absolute',
                                opacity: 0,
                                height: selectBoxHeight,
                                fontSize: customSelectSpan.css('font-size')
                            });
                            $('#wrapSelect_'+$select.attr('id')).height(selectBoxHeight);

                        })
                        .on('change.customSelect', function () {
                            customSelectSpan.addClass(getClass('Changed'));
                            changed($select, customSelectSpan);
                        })
                        .on('keyup.customSelect', function (e) {
                            if (!customSelectSpan.hasClass(getClass('Open'))) {
                                $select.trigger('blur.customSelect');
                                $select.trigger('focus.customSelect');
                            } else {
                                if (e.which == 13 || e.which == 27) {
                                    changed($select, customSelectSpan);
                                }
                            }
                        })
                        .on('mousedown.customSelect', function () {
                            customSelectSpan.removeClass(getClass('Changed'));
                        })
                        .on('mouseup.customSelect', function (e) {

                            if (!customSelectSpan.hasClass(getClass('Open'))) {
                                // if FF and there are other selects open, just apply focus
                                if ($('.' + getClass('Open')).not(customSelectSpan).length > 0 && typeof InstallTrigger !== 'undefined') {
                                    $select.trigger('focus.customSelect');
                                } else {
                                    customSelectSpan.addClass(getClass('Open'));
                                    e.stopPropagation();
                                    $(document).one('mouseup.customSelect', function (e) {
                                        if (e.target != $select.get(0) && $.inArray(e.target, $select.find('*').get()) < 0) {
                                            $select.trigger('blur.customSelect');
                                        } else {
                                            changed($select, customSelectSpan);
                                        }
                                    });
                                }
                            }
                        })
                        .on('focus.customSelect', function () {
                            customSelectSpan.removeClass(getClass('Changed')).addClass(getClass('Focus'));
                        })
                        .on('blur.customSelect', function () {
                            customSelectSpan.removeClass(getClass('Focus') + ' ' + getClass('Open'));
                        })
                        .on('mouseenter.customSelect', function () {
                            customSelectSpan.addClass(getClass('Hover'));
                        })
                        .on('mouseleave.customSelect', function () {
                            customSelectSpan.removeClass(getClass('Hover'));
                        })
                        .trigger('render.customSelect');
                });
            }
        });
    })(jQuery);
});
