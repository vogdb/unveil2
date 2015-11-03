/**
 * jQuery Unveil2
 * A very lightweight jQuery plugin to lazy load images
 * Based on https://github.com/luis-almeida/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2015 Joram van den Boezem
 * https://github.com/hongaar/unveil2
 */

(function ($) {

    $.fn.unveil = function (_treshold, _callback, _sizes) {

        console.log('Initializing unveil2 with the following options:', {
            treshold: _treshold,
            callback: _callback,
            _sizes: _sizes
        });

        // Initialize variables
        var $window = $(window),
            pixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            treshold = _treshold || 0,
            sizes = _sizes || [],
            retina = window.devicePixelRatio > 1,
            images = this,
            loaded;

        // Read and reset the src attribute first, to prevent loading
        // of original images
        this.each(function () {
            var $this = $(this),
                placeholder = $this.data('src-placeholder') || pixel;

            // Set data-src if not set
            if (!$this.data('src')) {
                $this.data('src', $this.prop('src'));
            }

            // Cancel download of current image & set placeholder after
            // a very short timeout
            $this.prop('src', '');
            setTimeout(function() {
                $this.addClass('unveil-placeholder');
                $this.prop('src', placeholder);
            }, 0);
        });

        // This triggers an image source to be set on the target,
        // based on window width and presence of retina screen
        this.one("unveil", function () {
            var $this = $(this), windowWidth = $window.width(),
                attrib = 'src', targetSrc, defaultSrc, retinaSrc;

            // Determine attribute to extract source from
            for (var i = 0; i < sizes.length; i++) {
                var dataAttrib = sizes[i].attribute.replace(/^data-/, '');
                if (windowWidth >= sizes[i].minWidth && $this.data(dataAttrib)) {
                    attrib = dataAttrib;
                    break;
                }
            }

            // Extract source
            defaultSrc = retinaSrc = $this.data(attrib);

            // Do we have a retina source?
            if (defaultSrc.indexOf("|") !== -1) {
                retinaSrc = defaultSrc.split("|")[1];
                defaultSrc = defaultSrc.split("|")[0];
            }

            // Change attribute on image
            if (defaultSrc) {
                targetSrc = (retina && retinaSrc) ? retinaSrc : defaultSrc;

                console.log('Unveiling with source image', targetSrc);

                $this.addClass('unveil-loading');
                $this.prop("src", targetSrc);
                $this.on('load', function() {
                    $this.removeClass('unveil-placeholder unveil-loading');
                    $this.addClass('unveil-loaded');
                    unveil();
                });

                // Fire up the callback if it's a function
                if (typeof _callback === "function") {
                    _callback.call(this);
                }
            }
        });

        function unveil() {
            var inview = images.filter(function () {
                var $e = $(this);
                if ($e.is(":hidden")) return;

                var viewportStart = $window.scrollTop(),
                    viewportEnd = viewportStart + $window.height(),
                    elementTop = $e.offset().top,
                    elementEnd = elementTop + $e.height();

                return elementEnd >= viewportStart - treshold && elementTop <= viewportEnd + treshold;
            });

            if (inview.length) {
                console.log('New images in view:', inview.length);
            }

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        $window.on("scroll.unveil resize.unveil lookup.unveil", unveil);

        // Wait a little bit for the placeholder to be set, so the src attribute
        // is not empty (which will mark the image as hidden)
        setTimeout(unveil, 0);

        return this;

    };

})(window.jQuery || window.Zepto);
