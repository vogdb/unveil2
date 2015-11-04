[![Build Status](https://travis-ci.org/nabble/unveil2.svg?branch=develop)](https://travis-ci.org/nabble/unveil2)

# unveil2.js

__A very lightweight plugin to lazy load images for jQuery or Zepto.js__

--------------

Based on the [excellent work](https://github.com/luis-almeida/unveil) by Luis Almeida.

## API

For now, see https://github.com/luis-almeida/unveil.

**Extra**

```js
// Added third parameter to specify extra large images after breakpoints
$("img").unveil(offset, success, [{
    minWidth: 768,
    attribute: 'data-src-large'
}]
```

```html
<!-- Specify default image in src attribute, placeholder in data-src-placeholder, retina source as '|' separated value -->
<img src="normal.jpg" data-src-placeholder="placeholder.jpg" data-src-large="larger.jpg|larger@x2.jpg" />
```

## License
Unveil2 is licensed under the [MIT license](http://opensource.org/licenses/MIT).
