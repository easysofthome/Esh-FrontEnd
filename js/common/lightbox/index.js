define(function (require, exports) {
    $(function () {
        Lightbox = require('lightbox');
        Lightbox.init();
        $('.case-cnt').on('click', '.j-pic-lb', function(e) {
            e.preventDefault();
            var picId = $(this).attr('data-picid');
            Lightbox.start(picId);

        });
    });
})