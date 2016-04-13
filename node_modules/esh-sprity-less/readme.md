# sprity-less

[![NPM version](https://badge.fury.io/js/sprity-less.svg)](http://badge.fury.io/js/sprity-less) [![Build Status](https://travis-ci.org/sprity/sprity-less.svg?branch=master)](https://travis-ci.org/sprity/sprity-less) [![Dependencies](https://david-dm.org/sprity/sprity-less.svg)](https://david-dm.org/sprity/sprity-less)

> A less style processor for [sprity](https://npmjs.org/package/sprity)

## Requirements

- [sprity](https://npmjs.org/package/sprity) version >= 1.0

## Install

Install with [npm](https://npmjs.org/package/sprity-less)

```
npm install sprity sprity-less --save
```

If you want to use `sprity-less` with the command line interface of `sprity` install it globally.

```
npm install sprity sprity-less -g
```

## Usage

On commandline:

```sh
sprity out/ src/*.png -s style.less -p less
```

In JavaScript:

```js
var sprite = require('sprity');
sprite.create({
  ...
  style: 'style.less',
  processor: 'less'
  ...
}, function () {
  console.log('done');
});
```

#### [less](http://lesscss.org/) usage example

```less
@import 'sprite'; // the generated style file (sprite.less)

// camera icon (camera.png in src directory)
.icon-camera {
  .sprite(@camera);
}

// cart icon (cart.png in src directory)
.icon-cart {
  .sprite(@cart);
}
```


## More

See [sprity](https://npmjs.org/package/sprity) documentation

---
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/sprity/sprity?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
