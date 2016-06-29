'use strict';

var _ = require('lodash');
var File = require('vinyl');
var through2 = require('through2');
var path = require('path');
var parsePath = require('parse-filepath');
var transform = function(opt) {
  return function(obj, enc, cb) {
    var stream = this;
    if (obj instanceof Error) {
      cb(obj);
    } else {
      if (obj) {
        if (obj.style) {
          var filePath = parsePath(opt.style);
          if (filePath.extname === '') {
            filePath.extname = obj.extension;
          }
          var _path = obj.name.split('-').join('/');
          //潘迪海修改：path增加一层路径
          stream.push(new File({
            base: filePath.dirname,
            relative: path.join(filePath.dirname, filePath.name + filePath.extname),
            path: path.join(filePath.dirname, _path, filePath.name + filePath.extname.toLowerCase()),
            contents: obj.style
          }));
        } else {
          //潘迪海修改：path增加一层路径
          _.each(obj.sprites, function(sprite) {
            var _path = obj.name.split('-').join('/');
            // 增加单文件监控 马强
            var tempPath = path.join(opt.out, _path, sprite.name + '.' + sprite.type.toLowerCase());
            if(opt.cusName !== ''){
              tempPath = 'sprite-' + opt.cusFolderStru + '.png';
            }

            stream.push(new File({
              base: opt.out,
              relative: sprite.name + '.' + sprite.type,
              path: tempPath,
              contents: sprite.contents
            }));
          });
        }
      }
      cb();
    }
  };
};

module.exports = function(opt) {
  return through2.obj(transform(opt));
};
