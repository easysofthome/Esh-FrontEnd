'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var path = require('path');

var getTemplate = function() {
  return fs.readFileAsync(path.join(__dirname, 'template', 'less.hbs'), 'utf8');
};


var editX = function(layout) {
  for (var i = layout.items.length - 1; i >= 0; i--) {
    var itemlayout = layout.items[i];
    itemlayout.x += (itemlayout.width - itemlayout.meta.width) / 2;
    itemlayout.y += (itemlayout.height - itemlayout.meta.height) / 2;
  };
}

var transform = Promise.method(function(layout, source, opt, Handlebars) {
  var template = Handlebars.compile(source);
  var layouts = [];
  editX(layout.layout)
  layouts.push(layout);
  return template({
    layouts: layouts
  });
});

module.exports = {
  process: function(layout, opt, Handlebars) {
    return getTemplate()
      .then(function(source) {
        return transform(layout, source, opt, Handlebars);
      });
  },
  isBeautifyable: function() {
    return true;
  },
  extension: function() {
    return 'less';
  }
};