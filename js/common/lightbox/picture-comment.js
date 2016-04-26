define(function (require, exports, module) {
    var d = {
        init: function () {
            this.$picCmtWp = $("#j-pic-cmtwp"), 
            this.bindEvents();
        },
        createElements: function (a) {
            this.point = a;
            var b = this.$picCmtWp.find(".z-curr-cmt");
            b.length ? (this.$comment = b, this.$edit = this.$comment.find(".cmt-edit")) : (this.$comment = $('<div class="j-pic-cmt pic-cmt z-isowner  z-cmt-editing z-curr-cmt"><a href="javascript:;" class="cmt-handle j-cmt-handle"></a></div>'), this.$edit = $('<div class="cmt-edit">                                    <textarea name="" class="cmt-txt j-cmt-txt" maxlength="50" placeholder="在这儿说点什么..."></textarea>                                    <p class="cmt-edit-ft clearfix">                                        <span class="cmt-tip">您还可以输入<span class="cmt-word-count j-word-count">50</span>字</span>                                        <a href="javascript:;" class="btn btn-disable j-save-btn">发 表</a>                                    </p>                                    <a href="javascript:;" class="m-cmt-cls j-cmt-cls"></a>                                </div>'), this.$picCmtWp.append(this.$comment.prepend(this.$edit))), this.positionPicCmt(), this.$comment.attr("data-picid", this.$picCmtWp.attr("data-picid"))[this.editPosition.left < 0 ? "addClass" : "removeClass"]("z-cls-left").find(".j-cmt-handle").addClass(window.gUserIsMale ? "z-male" : "z-female"), this.$edit.find(".j-cmt-txt").focus()
        },
        bindEvents: function () {
            var a = this;
            a.$picCmtWp.on("click", ".j-cmt-cls", a.close).on("click", ".j-save-btn", a.save).on("click", ".j-cmt-del", a.remove), $.subscribe("picture/adapt", $.proxy(a.resetPicCmtPosition, a)), this.bindMoveEvents(), this.limitWordCount()
        },
        bindMoveEvents: function () {
            var a = this,
				b = $(document);
            b.on("mousedown", ".j-cmt-handle", function (c) {
                function d(a) {
                    return a.preventDefault(), r ? (k = n + a.pageX - p, l = o + a.pageY - q, k = Math.min(Math.max(j, k), h - 3 * j), l = Math.min(Math.max(j, l), i - 2 * j), void f.css({
                        left: k,
                        top: l
                    })) : !1
                }
                c.preventDefault();
                var e = $(c.target),
					f = e.closest(".j-pic-cmt"),
					g = f.data("cmtid"),
					h = a.$picCmtWp.width(),
					i = a.$picCmtWp.height(),
					j = 20;
                if (!window.isSignIned) return window.location.href = "/signin?redir=/xiaoguotu", !1;
                if (!f.hasClass("z-isowner")) return !1;
                var k, l, m = f.position(),
					n = m.left,
					o = m.top,
					p = c.pageX,
					q = c.pageY,
					r = !0;
                a.$picCmtWp.addClass("z-cmt-moving"), b.on("mousemove", d), b.on("mouseup", function () {
                    r = !1, b.off("mousemove mouseup"), a.$picCmtWp.removeClass("z-cmt-moving");
                    var c = window.gScaleRatio,
						d = Math.round(k / c),
						e = Math.round(l / c);
                    $.ajax({
                        type: "PUT",
                        url: "/api/pichps/" + g,
                        contentType: "application/json",
                        data: JSON.stringify({
                            x: d,
                            y: e
                        })
                    }).always(function () {
                        f.attr({
                            "data-origleft": d,
                            "data-origtop": e
                        })
                    })
                })
            })
        },
        resetPicCmtPosition: function () {
            $(".j-pic-cmt").each(function () {
                var a = $(this),
					b = window.gScaleRatio,
					c = Math.round(parseFloat(a.attr("data-origleft")) * b),
					d = Math.round(parseFloat(a.attr("data-origtop")) * b);
                a.css({
                    left: c,
                    top: d
                })
            })
        },
        limitWordCount: function () {
            var a = null;
            this.$picCmtWp.on("keyup", ".j-cmt-txt", function () {
                var b = this;
                a && clearTimeout(a), a = setTimeout(function () {
                    var a = $(b),
						c = a.closest(".cmt-edit"),
						d = a.val().length,
						e = 50 - d;
                    e = e >= 0 ? e : 0, c.find(".j-word-count").text(e), c.find(".j-save-btn")[d > 0 ? "removeClass" : "addClass"]("btn-disable")
                }, 50)
            })
        },
        positionPicCmt: function () {
            var a = this.point,
				b = Math.round(a.left / window.gScaleRatio),
				c = Math.round(a.top / window.gScaleRatio);
            this.$comment.css(a).attr({
                "data-origLeft": b,
                "data-origTop": c
            }), this.positionEdit()
        },
        positionEdit: function () {
            var a = this.$picCmtWp.width(),
				b = this.$picCmtWp.height(),
				c = this.point.left,
				d = this.point.top,
				e = this.$edit.outerWidth(!0),
				f = this.$edit.outerHeight(!0);
            this.editPosition = {
                left: c + e > a ? -e : 0,
                top: d + f > b ? -f : 0
            }, this.$edit.css(this.editPosition)
        },
        save: function () {
            var a = $(this),
				b = a.closest(".j-pic-cmt"),
				c = b.find(".j-cmt-txt"),
				d = $.trim(c.val()),
				e = b.data("origleft"),
				f = b.data("origtop"),
				g = b.data("picid");
            return d ? e && f ? void $.ajax({
                type: "POST",
                url: " /api/pichps",
                contentType: "application/json",
                data: JSON.stringify({
                    obsPicId: g,
                    type: 0,
                    x: e,
                    y: f,
                    desc: d
                })
            }).then(function (a) {
                b.attr("data-cmtid", a).removeClass("z-curr-cmt").find(".cmt-edit").replaceWith('<div class="cmt-read"><div class="w-bg-mask"></div>                                        <p class="cmt-txt">' + d + '</p>                                        <a href="javascript:;" class="m-cmt-del j-cmt-del"></a>                                    </div>')
            }, function (a) {
                403 === a.status && alert("啊哦，输入的内容含有敏感词:(")
            }) : (alert("无法确定评论位置！"), !1) : (alert("请填写内容"), !1)
        },
        close: function () {
            $(this).closest(".j-pic-cmt").remove()
        },
        remove: function () {
            var a = $(this),
				b = a.closest(".j-pic-cmt"),
				c = b.data("cmtid");
            $.ajax({
                type: "DELETE",
                url: "/api/pichps/" + c
            }).done(function () {
                b.fadeOut(function () {
                    b.remove()
                })
            })
        }
    };
    module.exports = d;
});