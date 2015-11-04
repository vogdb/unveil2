[![Travis](https://img.shields.io/travis/nabble/unveil2.svg)](https://travis-ci.org/nabble/unveil2)
[![npm](https://img.shields.io/npm/v/unveil2.svg)](https://www.npmjs.com/package/unveil2)

# unveil2.js

__A very lightweight plugin to lazy load images for jQuery or Zepto.js__

--------------

Based on [luis-almeida/unveil](https://github.com/luis-almeida/unveil).

## API

```js
$("img").unveil({
    treshold: 100,
    success: function () {
        console.log('Unveiled', this);
    },
    placeholder: 'http://placehold.it/350x150',
    breakpoints: [
        {
            minWidth: 768,
            attribute: 'data-src-md'
        },
        {
            minWidth: 1200,
            attribute: 'data-src-lg'
        }
    ]
});
```

```html
<img src="normal.jpg"
    data-src-placeholder="placeholder.jpg"
    data-src-md="larger.jpg|larger@x2.jpg" />
```

## License
Unveil2 is licensed under the [MIT license](http://opensource.org/licenses/MIT).
