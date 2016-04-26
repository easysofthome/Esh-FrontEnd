define(function (require, exports, module) {
    var a = ["requestFullScreen", "mozRequestFullScreen", "webkitRequestFullScreen"],
		b = ["exitFullScreen", "mozCancelFullScreen", "webkitCancelFullScreen"],
		c = ["fullScreen", "mozFullScreen", "webkitIsFullScreen"],
		d = ["fullscreenchange", "mozfullscreenchange", "webkitfullscreenchange"],
		e = null,
		f = {
		    can: function () {
		        var b, c = document.documentElement || document,
					d = a.length;
		        if (null == e) for (b = 0; d > b; b++) c[a[b]] && (e = b);
		        return null != e;
		    },
		    enter: function () {
		        this.can() && document.documentElement[a[e]]();
		    },
		    exit: function () {
		        this.can() && document[b[e]]();
		    },
		    is: function () {
		        return this.can() && document[c[e]];
		    },
		    register: function (a) {
		        this.can() && document.addEventListener(d[e], a);
		    },
		    unregister: function (a) {
		        this.can() && document.removeEventListener(d[e], a);
		    }
		};
    return f;
});