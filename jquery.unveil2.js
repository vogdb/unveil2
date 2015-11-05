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

    // "unveil" as a variable to save some bytes
    var unveilString = 'unveil',
        images = $(),
        initialized = false;

    $.fn.unveil = function (opts) {

        opts = opts || {};

        console.log('Called unveil2 on', this.length, 'elements with the following options:', opts);

        // Initialize variables
        var $window = $(window),
            placeholder = opts.placeholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
            treshold = opts.treshold || 0,
            breakpoints = opts.breakpoints || [],
            retina = window.devicePixelRatio > 1,
            loaded;

        // Sort sizes array, arrange highest minWidth to front of array
        breakpoints.sort(function(a, b) {
            return b.minWidth - a.minWidth;
        });

        // Read and reset the src attribute first, to prevent loading
        // of original images
        this.each(function () {
            var $this = $(this),
                elmPlaceholder = $this.data('src-placeholder') || placeholder;

            // Add element to global array
            images = $(images).add(this);

            // If this element has been called before,
            // don't set placeholder now to prevent FOUI (Flash Of Ustyled Image)
            if (!$this.data(unveilString)) {

                // Set the unveil flag
                $this.data(unveilString, true);

                // Set data-src if not set
                if (!$this.data('src')) {
                    $this.data('src', $this.prop('src'));
                }

                // Set placeholder
                $this
                    .one('load', function() {
                        $(this).addClass(unveilString + '-placeholder');
                        unveil();
                    })
                    .prop('src', '')
                    .prop('src', elmPlaceholder);
            }
        });

        console.log('Images now in collection', images.length);

        // This triggers an image source to be set on the target,
        // based on window width and presence of retina screen
        this.one(unveilString, function () {
            var $this = $(this), windowWidth = $window.width(),
                attrib = 'src', targetSrc, defaultSrc, retinaSrc;

            // Determine attribute to extract source from
            for (var i = 0; i < breakpoints.length; i++) {
                var dataAttrib = breakpoints[i].attribute.replace(/^data-/, '');
                if (windowWidth >= breakpoints[i].minWidth && $this.data(dataAttrib)) {
                    attrib = dataAttrib;
                    break;
                }
            }

            // Extract source
            defaultSrc = retinaSrc = $this.data(attrib);

            // Do we have a retina source?
            if (defaultSrc && defaultSrc.indexOf("|") !== -1) {
                retinaSrc = defaultSrc.split("|")[1];
                defaultSrc = defaultSrc.split("|")[0];
            }

            // Change attribute on image
            if (defaultSrc) {
                targetSrc = (retina && retinaSrc) ? retinaSrc : defaultSrc;

                console.log('Unveiling image', {
                    attribute: attrib,
                    retina: retina,
                    defaultSrc: defaultSrc,
                    retinaSrc: retinaSrc,
                    targetSrc: targetSrc
                });

                // Change classes
                classLoading($this);

                // Set new source
                $this.prop("src", targetSrc);

                // When new source has loaded, do stuff
                $this.one('load', function() {

                    // Change classes
                    classLoaded($this);

                    // Loading the image may have modified page layout,
                    // so unveil again
                    unveil();
                });

                // If the image has instantly loaded, change classes now
                if (this.complete) {
                    classLoaded($this);
                }

                // Fire up the callback if it's a function
                if (typeof opts.success === "function") {
                    opts.success.call(this);
                }
            }
        });

        var unveil = function() {
            console.log('Unveiling');

            var inview = images.filter(function () {
                var $e = $(this);

                if ($e.is(":hidden")) return;

                var viewportStart = $window.scrollTop(),
                    viewportEnd = viewportStart + $window.height(),
                    elementTop = $e.offset().top,
                    elementEnd = elementTop + $e.height();

                return elementEnd >= viewportStart - treshold && elementTop <= viewportEnd + treshold;
            });

            inview.trigger(unveilString);
            images = images.not(inview);

            if (inview.length) {
                console.log('New images in view', inview.length, ', leaves' , images.length, 'in collection');
            }
        };

        var classLoading = function($elm) {
            $elm.addClass(unveilString + '-loading');
        };

        var classLoaded = function($elm) {
            $elm.removeClass(unveilString + '-placeholder ' + unveilString + '-loading');
            $elm.addClass(unveilString + '-loaded');
        };

        if (!initialized) {
            $window.on('scroll.' + unveilString + ' resize.' + unveilString + ' lookup.' + unveilString, unveil);
        }

        // Wait a little bit for the placeholder to be set, so the src attribute
        // is not empty (which will mark the image as hidden)
        setTimeout(unveil, 0);

        initialized = true;

        return this;

    };

})(window.jQuery || window.Zepto);