# Taggd [![Build Status](http://img.shields.io/travis/timseverien/taggd.svg)](https://travis-ci.org/timseverien/taggd) [![Coverage Status](http://img.shields.io/coveralls/timseverien/taggd.svg)](https://coveralls.io/r/timseverien/taggd) ![Library Size](https://badge-size.herokuapp.com/timseverien/taggd/master/dist/taggd.min.js?compression=gzip) [![cdnjs](https://img.shields.io/cdnjs/v/taggd.svg)](https://cdnjs.com/libraries/taggd)

Taggd is a tool that allows you to tag pictures with additional information.

## Installation

* [Download the latest release](https://github.com/timseverien/taggd/archive/master.zip)
* npm: `npm install taggd`
* Bower: `bower install taggd`
* cdnjs: https://cdnjs.com/libraries/taggd

## Usage

You need to include the stylesheet in the `<head>`-tag, and the script in the `<body>`-tag. Both files are in the `dist` directory.

```html
<link rel="stylesheet" href="/path/to/taggd/dist/taggd.css">
```

The stylesheet has no default theme, so they will be dull default buttons ready for you to style!

```html
<script src="/path/to/taggd/dist/taggd.js"></script>
```

Finally, you can initialise taggd:

```js
const image = document.getElementById('my-image');
const options = {};
const tags = [];

const taggd = new Taggd(image, options, tags);
```

The `options` parameter is a list of [options](https://doclets.io/timseverien/taggd/master/options). The `tags` parameter is a list of [Tag](https://doclets.io/timseverien/taggd/master#dl-Tag)s. These are the buttons and popup that will render over your image. You can generate these using the [Taggd tags generator](https://timseverien.github.io/taggd/v3/generator).

### Note on import strategy

If you’re importing Taggd via the ES2015 syntax with a bundler that respects the [`module` field in `package.json`](https://github.com/rollup/rollup/wiki/pkg.module), `Taggd` and `Tag` are exported separately:

```js
import { Taggd, Tag } from 'taggd';

new Taggd(image, options, [
  new Tag(...),
]);
```

If you include the UMD bundle, `Tag` is part of the `Taggd` class:

```js
new Taggd(image, options, [
  new Taggd.Tag(...),
]);
```

The former allows ES2015+ environments to use imports as intended. The latter prevents having to expose multiple classes.

If you have better ideas to have best of both worlds, please [create an issue](https://github.com/timseverien/taggd/issues).

## Documentation

For more information, check out [the documentation](https://doclets.io/timseverien/taggd/master/overview).

## License

The code is released under [the MIT license](https://github.com/timseverien/taggd/blob/LICENSE.txt).
