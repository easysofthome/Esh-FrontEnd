define([], function (require, exports, module) {
    var a = {
        limitedRatio: 1.5,
        timer: null,
        intervalTime: 100,
        init: function (a, b) {
            this.$imgwp = a,
                this.$wp = b;
        },
        update: function (a) {
            this.url = a,
            this.getPictureSize();
        },
        updateFlash: function (url, iframeSrc, ismaxWidth) {
            this.url = url;
            var that = this;

            var fnCall = function (origWidth, origHeight) {
                that.origWidth = origWidth, that.origHeight = origHeight;
                var src = iframeSrc + url + "&width=" + origWidth + "&height=" + origHeight;
                if (!that.$flashIframe) {
                    that.$flashIframe = $([
                        '  <iframe  id="3dflash" name="3dflash"',
                        'scrolling="no" frameborder="0" marginheight="0" marginwidth="0" > </iframe>'
                    ].join(''));
                }
                that.$flashIframe.attr('src', src).attr('width', origWidth).attr('height', origHeight);
                that.calculate();
                that.setFlashSrc();
                return true;
            };
            //三维表中本就有图像的宽度和高度但是这个数值不知道是否正确
            //如果正确三维就不用在去获取高度和宽度
            ismaxWidth ? fnCall(that.$wp.width()-40, that.$wp.height()-100) : this.getPictureSize(fnCall);

        },
        getPictureSize: function (callback) {
            var a = new Image,
				b = this;
            a.src = this.url, b.timer && clearInterval(b.timer), b.timer = setInterval(function () {
                if (a.width && a.height) {
                    clearInterval(b.timer), b.origWidth = a.width, b.origHeight = a.height;
                    (callback && callback(a.width, a.height)) || (b.setSrc(), b.calculate());
                }
            }, b.intervalTime);
        },
        calculate: function () {

            var a = this.origWidth,
				b = this.origHeight,
				c = b / a,
				d = this.$wp.width(),
				e = this.$wp.height(),
				f = e / d,
				g = f >= c ? d / a : e / b;
            g = Math.min(g, this.limitedRatio), window.gScaleRatio = g, this.rsWidth = (a * g).toFixed(3), this.rsHeight = (b * g).toFixed(3), this.setStyle();
            $.publish("picture/adapt", g);
        },
        setStyle: function () {
            var a = this.rsWidth,
				b = this.rsHeight;
            this.$imgwp.css({
                width: a,
                height: b,
                marginLeft: -a / 2,
                marginTop: -b / 2
            })
        },
        setSrc: function () {
            if (this.$flashIframe) this.$flashIframe.hide();
            var a = this.$imgwp.find("img");
            a.stop(!0).hide(), a.attr("src", this.url).fadeIn("fast")
        },
        setFlashSrc: function () {
            var $img = this.$imgwp.find("img");
            if ($img.next('#3dflash').length == 0) {
                $img.before(this.$flashIframe);
            }
            $img.hide();
            this.$flashIframe.show();
        },
        clear: function () {
            clearInterval(this.timer)
        }
    };
    return a
});