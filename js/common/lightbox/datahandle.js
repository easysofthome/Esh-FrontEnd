define(function (require, exports, module) {
    require("jquery");
    var urlParam = require('urlParam');
    var a = {
        currData: {
            index: 0,
            data: []
        },
        prevData: {},
        config: {
            mode: 1
        },
        ajaxData: [],
        init: function (a) {
            a = a || window.LBConfig, this.config = $.extend(this.config, a), this.fetchPageData(), this.currData.data = this.ajaxData;
        },
        start: function (a,b) {
            this.init(), this.getIndex(a), this.fetchPictureData(b)
        },
        getIndex: function (a) {
            for (var b = this.currData.data, c = 0, d = b.length; d > c; c++) if (a == b[c].obsPicId) {
                this.currData.index = c;
                break
            }
        },
        getPic: function () {
            return this.currData.data[this.currData.index];
        },
        prev: function () {
            if (this.currData.index--, this.currData.index < 0) {
                if (1 !== this.config.mode) return this.currData.index++, void $.publish("picture/prev", !1);
                if (!(this.config.pageNum > 1)) return this.currData.index++, void $.publish("picture/prev", !1);
                this.config.pageNum--, this.fetchPageData(), this.currData.index = this.ajaxData.length - 1, this.currData.data = this.ajaxData, $.publish("picture/next", !0);
            }
            this.fetchPictureData(), $.publish("picture/next", !0);
        },
        next: function () {
            if (this.currData.index++, this.currData.index === this.currData.data.length) {
                if (1 !== this.config.mode) return this.currData.index--, $.publish("picture/next", !1), void $.publish("picture/recommend");
                if (this.config.pageNum++, this.fetchPageData(), !this.ajaxData.length) return this.currData.index--, this.config.pageNum--, void $.publish("picture/next", !1);
                this.currData.data = this.ajaxData, this.currData.index = 0, $.publish("picture/prev", !0);
            }
            this.fetchPictureData(), $.publish("picture/prev", !0);
        },
        fetchPageData: function () {

            var a = this,
                b = a.config,
                pageIndex = b.pageNum ? b.pageNum : 1;
            this.url = b.url ? urlParam.replaceUrlParams(b.url, { page: pageIndex }) : "/UIDesign/ashx/DesignPhoto.ashx",
                $.ajax({
                    dataType: "json",
                    type: "GET",
                    url: this.url + "&listDataType=" + b.listDataType,
                    async: !1
                }).done(function(b) {
                    a.ajaxData = b && b.Data && b.Data.length ? b.Data : [];
                });

        },
        fetchPictureData: function (pic) {
            var a = this.currData,
				b =pic|| a.data[a.index].obsPicId,
                d = a.data[a.index].dataType,
				c = "/UIDesign/ashx/DesignPhoto.ashx?action=model&listDataType=" + this.config.listDataType + "&id=" + b;
            $.ajax({
                type: "POST",
                url: c
            }).done(function(a) {

                a = $.parseJSON(a), $.publish("picture/update", a.Data);
            });


        },
        storeData: function (a) {
            this.prevData.index = this.currData.index, this.prevData.data = this.currData.data, this.init(a), this.currData.index = 0, this.fetchPictureData()
        },
        recoverData: function (a) {
            this.currData.index = this.prevData.index, this.currData.data = this.prevData.data, this.init(a), this.fetchPictureData()
        },
        setIndex: function (a) {
            for (var b = this.currData.data, c = 0, d = b.length; d > c; c++) if (a == b[c].obsPicId) {
                this.currData.index = c;
                break;
            }
        }
    };
    return a;
});