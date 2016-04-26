/*
自动根据窗口的大小缩放图片，模式窗口，幻灯片方式播放,内容预加载，渐变等
*/
define(function (require, exports, module) {
    require("jquery");
    var layer = require("layer");
    var alertify = require("alertify");
    var showLoginForm = require('loginPanel');
    var d = require("js/common/lightbox/handlebars.js"),
    // laytpl = require("js/lib/layer/laytpl.js"),
		fullscreen = require("fullscreen"),
		f = require("js/common/lightbox/datahandle.js"),
		g = require("js/common/lightbox/picture-adaptor.js"),
		h = require("js/common/lightbox/picture-comment.js"),
        head = require('headJs');
    require("js/lib/jquery.mousewheel/jquery.mousewheel.js"),
        require("$.cookie"),
        function (a) {
            var b = a({});
            a.subscribe = function () {
                b.on.apply(b, arguments);
            }, a.unsubscribe = function () {
                b.off.apply(b, arguments);
            }, a.publish = function () {
                b.trigger.apply(b, arguments);
            };
        } (jQuery);
    var i = {
        isOpen: !1,
        resizeTimer: null,
        resizeTimeoutTime: 100,
        init: function (tmplRenderFn) {
            this.cacheElements(tmplRenderFn), this.bindEvents(), g.init(this.$picWp, this.$main), h.init();
        },
        cacheElements: function (tmplRenderFn) {
            this.$window = $(window),
                this.$html = $("html"),
                this.$lightbox = $("#lightbox"),
                this.$payment = $("#payDiv"),
                this.$flashDiv = $("#OverDiv"),
                this.$3dflash = $("#3dflash"),
                this.$payName = this.$payment.find(".payName"),
                this.$payPrice = this.$payment.find(".payPrice"),
                this.$payowner = this.$payment.find(".ownerName"),
                this.$payTypeName = this.$payment.find(".payTypeName"),
            //this.$doPayment = this.$payment.find("#afukuan"),  
                this.$payImg = this.$payment.find(".payImg"),
                this.$main = this.$lightbox.find("#j-lb-main"),
                this.$picWp = this.$main.find("#j-lb-picwp"),
                this.$pic = this.$picWp.children("#j-lb-pic"),
                this.$picCmtWp = this.$picWp.find("#j-pic-cmtwp"),
                this.$picCtrl = this.$main.find("#j-lb-pic-ctrl"),
                this.$picPrevCtrl = this.$picCtrl.find(".ctrl-prev"),
                this.$picNextCtrl = this.$picCtrl.find(".ctrl-next"),
                this.$crumb = this.$main.find("#j-lb-crumb"),
                this.$fullScreenBtn = this.$main.find("#j-lb-fullscreen"),
                this.$recPic = this.$lightbox.find("#j-lb-rec-pic"),
                this.$peroperationBtn = this.$main.find(".opt-overlay"),
            //this.$opt1Btns = this.$main.find(".j-collect, .j-ask"),
                this.$opt1 = this.$main.find(".opt-1"),
                this.$opt2 = this.$main.find(".opt-2"),
                this.$picCmtSwitch = this.$opt2.find("#j-lbpic-cmt"),
                this.$downloadBtn = this.$main.find("#j-lbpic-download"),
                this.$side = this.$lightbox.find("#j-lb-side"),
                this.$sideCnt = this.$side.find("#j-side-cnt"),
                this.$sideSwitch = this.$side.find("#j-side-switch"),
                this.$sideTop = this.$side.find("#j-side-top"),
                this.$question = this.$side.find("#j-lb-question"),
                this.$questionTitle = this.$question.children(".qt-tt"),
                this.$questionList = this.$side.find("#j-qt-list"),
                this.$resemble = this.$side.find("#j-lb-resemble"),
                this.$resemblelist = this.$resemble.find("a"),
                this.tmplRenderFn = tmplRenderFn;

        },
        bindEvents: function () {
            var a = this,
                        b = this.$side;
            a.$window.on("resize", $.proxy(a.resize, a)), a.$recPic.on("click", ".back", function () {
                a.$recPic.hide();
            }),
            //图片点击事件注释
            //                    a.$picCmtSwitch.on("click", $.proxy(a.handlePicCmtViewStatus, a)), a.$html.on("click", ".z-piccmt-on #j-lb-pic", function(b) {
            //                        //if (!window.isSignIned) return window.location.href = "/signin?redir=" + (a.origURL || "/xiaoguotu"), !1;
            //                        var c = {
            //                            top: b.pageY - a.$pic.offset().top,
            //                            left: b.pageX - a.$pic.offset().left
            //                        };
            //                        h.createElements(c);
            //                    }), 
            b.on("click", ".j-lb-close", $.proxy(a.hide, a)), b.on("click", ".j-show-favor", $.proxy(a.showFavorList, a)), a.$sideSwitch.on("click", function () {
                a.toggleSide();
            }), b.on("click", ".j-ib-pic", a.changeIntoIdeabookView), a.$main.on("click", "#j-lb-crumb", $.proxy(a.recoverToPicFlowView, a)), $.subscribe("picture/update", $.proxy(a.updatePicture, a)), $.subscribe("picture/update", $.proxy(a.updateRelatedPicId, a)), $.subscribe("picture/update", $.proxy(a.updatePictureInfo, a)), $.subscribe("picture/update", $.proxy(a.updatePictureQuestion, a)), $.subscribe("picture/update", $.proxy(a.getPicCmt, a)), $.subscribe("picture/update", $.proxy(a.collectPicture, a)), a.$questionList.on("focus", "textarea", function () {
                return window.window.isSignIned ? void $(this).closest(".lb-qt-ft").addClass("z-qt-reply") : void window.showSignIn();
            }).on("click", ".j-btn-reply", a.answerQuestion).on("click", ".j-answer-like", a.toggleLikeAnswer), !fullscreen.can() && this.$fullScreenBtn.hide(), a.$fullScreenBtn.on("click", $.proxy(a.toggleFullScreen, a)), fullscreen.register($.proxy(a.handleFullScreen, a)), a.$main.on({
                mouseenter: function () {
                    a.$main.addClass("z-main-hover");
                },
                mouseleave: function () {
                    a.$main.delay(2e3).removeClass("z-main-hover");
                }
            }), a.bindPicCtrlEvents();
        },
        bindPicCtrlEvents: function () {
            var a = this,
                        b = null;
            a.$picPrevCtrl.on("click", $.proxy(a.prev, a)), a.$picNextCtrl.on("click", $.proxy(a.next, a)), a.$main.mousewheel(function (c, d) {
                b && clearTimeout(b), b = setTimeout(function () {
                    a.isOpen && a[0 > d ? "next" : "prev"]();
                }, 400);
            }), $.subscribe("picture/prev", $.proxy(a.prevCtrl, a)), $.subscribe("picture/next", $.proxy(a.nextCtrl, a)), $.subscribe("picture/recommend", $.proxy(a.showRecPic, a))
        },
        start: function (a, b) {
            this.origURL = window.location.href,
                        this.isPicCmtVisible = "false" === $.cookie("isPicCmtVisible") ? !1 : !0,
                        f.start(a, b),
                        this.show();
        },
        prev: function () {
            f.prev();
        },
        next: function () {
            f.next();
        },

        prevCtrl: function (a, b) {
            this.$picPrevCtrl[b ? "show" : "hide"]();
        },
        nextCtrl: function (a, b) {
            this.$picNextCtrl[b ? "show" : "hide"]();
        },
        handlePicCmtViewStatus: function () {
            var a = this.$lightbox;
            this.$picCmtWp.html(""), a.toggleClass("z-piccmt-on"), this.isPicCmtVisible = a.hasClass("z-piccmt-on"), $.cookie("isPicCmtVisible", this.isPicCmtVisible, {
                expires: 30,
                path: "/"
            }), this.getPicCmt();
        },
        getPicCmt: function () {

        },
        updatePicture: function (a, b) {
            //判断加载的是否是flash
            !b.isFlash ? g.update(b.img) : g.updateFlash(b.img, b.iframeSrc, b.ismax);
            this.picUrl = b.img, this.data = b, !fullscreen.is() && this.updateURL(b.obsPicId)
        },
        updateRelatedPicId: function (a, b) {
            var c = b.obsPicId;
            this.picId = c, this.$downloadBtn.attr("href", '/UIDesign/ashx/DowmLoadFile.ashx?file=' + encodeURIComponent(b.img)), this.$picCmtWp.attr("data-picid", c);
            if (b.status == 1) {
                this.$downloadBtn.show();
            } else {
                this.$downloadBtn.hide();
            }
        },
        updatePictureInfo: function (a, b) {
            var c = this;
            this.tmplRenderFn.renderdetailPanel(b, function (h) {
                c.$sideTop.html(h);
            });

            this.$payName.html(b.name);
            this.$payTypeName.html(b.typeName);
            this.$payPrice.html(b.price);
            this.$payowner.html(b.owner);

            //这个src没发现有什么用
            this.$payImg.attr("src", b.img);
            //移除鼠标滚动事件,品质样的flash用鼠标滚动来调整大小
            b.moveMousewheel && this.$main.unmousewheel(), this.$main.mousewheel(function () { });
            this.$sideTop.find("a").unbind("click");
            this.$sideTop.find("#toRegistered").click(function () {
                var href = $(this).attr("data-src");
                //c.doRegistered(this, href);
            });
            this.$sideTop.find("#toLogin").click(function () {
                c.doLogin(this);
            });
            this.$sideTop.find("#toPay").click(function () {
                var paymentType = $(this).attr("data-paymenttype");
                var ationUrl = "/UIDesign/ashx/DesignPhoto.ashx?action=add&listDataType=" + b.listDataType + "&id=" + b.obsPicId;
                c.doBuy(ationUrl);
            });
            this.$sideTop.find(".flash").click(function () {
                var href = $(this).attr("data-src") + b.obsPicId;
                if (b.status == "1") {
                    c.palyFalsh(b);
                } else {
                    var ationUrl = "/UIDesign/ashx/DesignPhoto.ashx?action=status&listDataType=" + b.listDataType + "&id=" + b.obsPicId;
                    c.doOperation(ationUrl, href, this, b);
                }
            });
            this.$sideTop.find(".toDesign").click(function () {
                var href = $(this).attr("data-src") + b.obsPicId;
                if (b.status == "1") {
                    $(this).attr("href", href);
                } else {
                    var ationUrl = "/UIDesign/ashx/DesignPhoto.ashx?action=status&listDataType=" + b.listDataType + "&id=" + b.obsPicId;
                    c.doOperation(ationUrl, href, this);
                }
            });
            //相似花型
            if (b.resemble) {
                c.$resemblelist.attr("data-picid", "");
                c.$resemblelist.find('div').css({
                    "background-image": "url('/Static/images/loading-s.gif')",
                    "background-repeat": "no-repeat",
                    "background-position": "center center"
                });                
                c.$resemble.show();
                c.GetResemble(b);
            }
            else {
                c.$resemble.hide();
            }
            //点击相似花型
            c.$resemblelist.click(function () {

                var picId = $(this).attr('data-picid');
                if (picId) {
                    f.fetchPictureData(picId);
                }
            });
        },
        //查找相似花型
        GetResemble: function (e) {
            var c = this;
            var ationUrl = "/UIDesign/ashx/DesignPhoto.ashx?action=resemble&listDataType=" + e.listDataType + "&id=" + e.obsPicId;
            $.ajax({
                dataType: "json",
                type: "POST",
                url: ationUrl
            }).done(function (data) {
                if (data.Success) {
                  c.drawResembleTable.call(this, data.Data,c);
                } 
            });
        },
        drawResembleTable: function (data,c) {
            var htmlStr = '';
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (c.$resemblelist || c.$resemblelist[i]) {
                        var $item = $(c.$resemblelist[i]);
                        $item.attr("data-picid", data[i].SYSNUMBER);
                        $item.find('div').css({
                            "background-image": "url('" + data[i].IMGPATH + "')",
                            "background-repeat": "",
                            "background-position": ""
                        });
                    }
                }
            }
        },
        updatePictureQuestion: function (a, b) {

        },
        updatePicCmtPosition: function () {

        },
        showFavorList: function (a) {

        },
        answerQuestion: function () {

        },
        toggleLikeAnswer: function () {

        },
        changeIntoIdeabookView: function () {

            var a = $(this),
                        b = (a.data("picid"), a.data("hbid")),
                        c = i.$side.find("#lb-info h3").text(),
                        d = {
                            mode: 2,
                            obsIdeaBookId: b
                        };
            i.$crumb.find(".tt").html(c).end().find(".thumb").attr("src", i.picUrl), f.storeData(d), i.$lightbox.addClass("z-detail-view"), i.enterIdeabookView = !0
        },
        recoverToPicFlowView: function () {
            f.recoverData({
                mode: 1
            }), i.$lightbox.removeClass("z-detail-view"), i.enterIdeabookView = !1, $.publish("picture/next", !0)
        },
        resize: function () {
            var a = this;
            if (a.isOpen) {
                var b = a.$window,
                    bh = b.height() === 0 ? $('body').height() : b.height(),
                    bw = b.width() === 0 ? $('body').width() : b.width(),
                            c = Math.max(bw, 980),
                            d = Math.max(bh, 450);
                a.$lightbox.css({
                    width: c,
                    height: d,
                    top: b.scrollTop()
                }), a.$sideCnt.height(d - 40), g.calculate(), a.updatePicCmtPosition();
            }
        },
        //操作按钮
        collectPicture: function (a, b) {
            var c = this;
            var ationUrl = "/UIDesign/ashx/DesignPhoto.ashx?action=add&listDataType=" + b.listDataType + "&id=" + b.obsPicId;
            this.tmplRenderFn.renderoperationBtn(b, function (html) {
                var opt1 = c.$peroperationBtn.next('.opt-1'), currenthtml = opt1.html(), $h = $(html);
                if ($.trim(currenthtml) != $.trim($h.html())) {
                    opt1.remove();
                    c.$peroperationBtn.after($h);
                    var p = c.$peroperationBtn.next();
                    p.find('#loginBtn').click(function () {
                        c.doLogin(this);
                    });
                    p.find('#buyBtn').click(function () {
                        c.doBuy(ationUrl);
                    });
                }
            });
        },
        addQuestion: function (a) {
            this.$questionList.append(this.questionTemplate([a]));
        },
        toggleFullScreen: function () {
            fullscreen.is() ? fullscreen.exit() : fullscreen.enter();
        },
        handleFullScreen: function () {
            var a = $.proxy(this.resize, self);
            fullscreen.is() ? (this.$lightbox.addClass("z-lb-fullscreen"), this.toggleSide(!1, a)) : (this.$lightbox.removeClass("z-lb-fullscreen"), this.toggleSide(!0, a), this.updateURL(this.picId))
        },
        toggleSide: function (a, b) {
            var c = window.screen.width,
                        d = c + this.$side.width();
            a !== !0 && this.$sideSwitch.hasClass("z-side-on") ? (this.$sideSwitch.removeClass("z-side-on"), this.$lightbox.animate({
                width: d
            }, b)) : (this.$sideSwitch.addClass("z-side-on"), this.$lightbox.animate({
                width: c
            }, b));
        },
        updateURL: function (a) {
            if (window.history.pushState) {
                var b = "";
            }
        },
        showRecPic: function () {
            var a = this;
            $.ajax({
                type: "GET",
                url: "/api/ideabooks?type=rcmd&obsIdeaBookId=" + window.LBConfig.obsIdeaBookId
            }).done(function (b) {
                b = JSON.parse(b), a.$recPic.find("ul").html($.map(b, function (a) {
                    return '<li><a href="' + a.linkToIdeaBook + '" class="pic-item"><img src="' + a.mainPic + '" alt=""><p>' + (a.name || "") + "</p></a></li>";
                }).join("")).end().find(".j-next-hb").attr("href", b[0].linkToIdeaBook).end().show();
            });
        },
        show: function () {
            this.$html.addClass("no-scroll"), this.$lightbox[this.isPicCmtVisible ? "addClass" : "removeClass"]("z-piccmt-on"), this.isOpen = !0, this.resize(), this.$lightbox.show();
        },
        hide: function () {
            this.updateURL(), this.$lightbox.hide(), this.$html.removeClass("no-scroll"), fullscreen.is() && fullscreen.exit(), this.$pic.attr("src", ""), this.isOpen = !1, g.clear(), this.$lightbox.hasClass("z-detail-view") && (this.$lightbox.removeClass("z-detail-view"), window.LBConfig.mode = 1), $.publish("picture/prev", !0), $.publish("picture/next", !0);
        },
        rechang: function (msg, url, ok, cancel) {
            alertify.set({
                labels: {
                    ok: "立即充值",
                    cancel: "取消"
                }
            });
            alertify.confirm(msg == undefined ? "你的余额不足，请充值" : msg, function (e) { if (e) { if (ok != undefined) ok(); window.open(url, "_blank"); } else { if (cancel != undefined) cancel(); } });
        },
        ajaxStatus: function (ationUrl, href, eventItem, b) {
            var c = this;
            $.ajax({
                dataType: "json",
                type: "POST",
                url: ationUrl
            }).done(function (data) {
                if (data.Success) {
                    if (data.status == "1") {
                        if ($(eventItem).attr("data-type" == "3")) {
                            c.palyFalsh(b);
                        } else {
                            window.open(href, "_blank");
                        }
                    } else if (data.status == "2") {
                        showLoginForm(f.fetchPictureData);
                    } else {
                        layer.tips(data.operateMsg, eventItem, {
                            style: ['background-color:#78BA32; color:#fff', '#78BA32'],
                            maxWidth: 185,
                            time: 3,
                            closeBtn: [0, true]
                        });
                    }
                } else {
                    alertify.error("操作失败!");
                }
            });
        },
        doRegistered: function (eventItem, href) {
            $.ajax({
                dataType: "json",
                type: "POST",
                data: { "action": "isLogin" },
                url: "/Member/ashx/login.ashx"
            }).done(function (data) {
                if (data.Success) {
                    f.fetchPictureData();
                    layer.tips("已登录!", eventItem, {
                        style: ['background-color:#78BA32; color:#fff', '#78BA32'],
                        maxWidth: 185,
                        time: 3,
                        closeBtn: [0, true]
                    });
                    head.init();
                }
                else {
                    window.open(href, "_blank");
                }
            });
        },
        doLogin: function (eventItem) {
            $.ajax({
                dataType: "json",
                type: "POST",
                data: { "action": "isLogin" },
                url: "/Member/ashx/login.ashx"
            }).done(function (data) {
                if (data.Success) {
                    f.fetchPictureData();
                    layer.tips("已登录!", eventItem, {
                        style: ['background-color:#78BA32; color:#fff', '#78BA32'],
                        maxWidth: 185,
                        time: 3,
                        closeBtn: [0, true]
                    });

                    head.init();
                }
                else {
                    showLoginForm(function () {
                        f.fetchPictureData();
                    });
                }
            });
        },
        doOperation: function (actionUrl, href, eventItem) {
            this.ajaxStatus(actionUrl, href, eventItem);
        },
        doBuy: function (ationUrl) {
            var c = this;
            var pay = $.layer({
                type: 1,
                title: false,
                area: ['600px', '260px'],
                fadeIn: 300,
                page: {
                    html: $("#payDiv").html()
                },
                success: function (layero) {
                    layero.find("#afukuan").click(function () {
                        $.ajax({
                            dataType: "json",
                            type: "POST",
                            url: ationUrl
                        }).done(function (data) {
                            if (data.Success) {
                                layer.close(pay);
                                f.fetchPictureData();
                                alertify.success("购买成功!");
                            } else if (data.Data == -1) {
                                showLoginForm(function () {
                                    f.fetchPictureData();
                                });
                            } else if (data.Data == -5) {
                                layer.close(pay);
                                c.rechang("余额不足,是否现在充值？", '/AcountManger/recharge', null, function () { });
                            } else {
                                alertify.error(data.Message);

                            }
                        });
                    });
                }
            });

        },
        alertTest: function () {
            alert(1111);
        }
    },
		j = $("#j-side-cnt"),
		k = $("#j-cnt-inner");
    window.ajaxAskHtml = function (a) {
        var b = i.$questionTitle.find(".j-qt-count"),
            c = parseInt(b.data("count"));
        i.$question.show(), b.html(++c), i.addQuestion(a);
        var d = k.height() - j.height();
        j.animate({
            scrollTop: d
        });
    }, module.exports = i;
});