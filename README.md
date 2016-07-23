# Taggd [![Build Status](http://img.shields.io/travis/timseverien/taggd/3.0.svg)](https://travis-ci.org/timseverien/taggd) [![Coverage Status](http://img.shields.io/coveralls/timseverien/taggd/3.0.svg)](https://coveralls.io/r/timseverien/taggd?branch=3.0)

Taggd is a tool that allows you to tag pictures with additional information.

## Installation

* [Download the latest release](https://github.com/timseverien/taggd/archive/3.0.zip)
* npm: TODO
* Bower: TODO

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

[Options](https://github.com/timseverien/taggd/wiki#options) are a set of options to set behaviour. [Tags](https://github.com/timseverien/taggd/wiki#options) are the the buttons and popup that will render over your image.

## Documentation

For more information, check out [the documentation](https://github.com/timseverien/taggd/wiki).

## License

The code is released under [the MIT license](https://github.com/timseverien/taggd/blob/3.0/LICENSE.txt).
