/**
 * jQuery Unveil2
 * A very lightweight jQuery plugin to lazy load images
 * Based on https://github.com/luis-almeida/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2015 Joram van den Boezem
 * https://github.com/hongaar/unveil
 */

;
(function ($) {

    $.fn.unveil = function (threshold, callback, sizes) {

        // Initialize variables
        var $window = $(window),
            pixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            th = threshold || 0,
            sizes = sizes || [],
            retina = window.devicePixelRatio > 1,
            images = this,
            loaded;

        // Read and reset the src attribute first, to prevent loading
        // of original images
        this.each(function () {
            var $this = $(this);
            if (!$this.data('src')) {
                $this.data('src', $this.prop('src'));
            }
            var placeholder = $this.data('src-placeholder') || pixel;
            $this.prop('src', placeholder);
        });

        // This triggers an image source to be set on the target,
        // based on window width and presence of retina screen
        this.one("unveil", function () {
            var $this = $(this), windowWidth = $window.width(),
                attrib = 'src', src, retinaSrc;

            //console.log('unveil', $this);

            // Determine attribute to extract source from
            for (var i = 0; i < sizes.length; i++) {
                var dataAttrib = sizes[i].attribute.replace(/^data-/, '');
                if (windowWidth >= sizes[i].minWidth && $this.data(dataAttrib)) {

                    //console.log('using', dataAttrib);

                    attrib = dataAttrib;
                    break;
                }
            }

            // Extract source
            src = retinaSrc = $this.data(attrib);

            // Do we have a retina source?
            if (src.indexOf("|") !== -1) {
                retinaSrc = src.split("|")[1];
                src = src.split("|")[0];
            }

            // Change attribute on image
            if (src) {

                //console.log('retina?', retina);
                //console.log('src?', (retina && retinaSrc) ? retinaSrc : src);

                $this.prop("src", (retina && retinaSrc) ? retinaSrc : src);
                $this.on('load', unveil);

                // Fire up the callback if it's a function
                if (typeof callback === "function") {
                    callback.call(this);
                }
            }
        });

        function unveil() {
            var inview = images.filter(function () {
                var $e = $(this);
                if ($e.is(":hidden")) return;

                var wt = $window.scrollTop(),
                    wb = wt + $window.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();

                return eb >= wt - th && et <= wb + th;
            });

            //console.log('now in view', inview.length, 'images');

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        $window.on("scroll.unveil resize.unveil lookup.unveil", unveil);

        unveil();

        return this;

    };

})(window.jQuery || window.Zepto);
