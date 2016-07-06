/*global
 $, QUnit
 */

(function () {

    "use strict";

    QUnit.config.testTimeout = 2000;

    var imageUrl = 'lazy.jpg',
        unusedUrl = 'unused.jpg',
        debug = true,
        uniqueImageUrl = function () {
            return 'lazy.jpg?t=' + new Date().getTime();
        };

    QUnit.test("Basic test", function (assert) {
        // Some basic tests if initial behaviour is consistent
        assert.equal(typeof $.fn.unveil, 'function', 'Unveil should be loaded');
        assert.equal($('').unveil().length, 0, 'Unveil without arguments should return empty array');
        assert.equal($('<div/>').unveil()[0].nodeName, 'DIV', 'Unveil with div should just return the DIV');
    });

    QUnit.test("Single image test", function (assert) {
        var done = assert.async(1);
        var image = $('<img/>')
            .addClass('lazy topleft')
            .attr('src', uniqueImageUrl())
            .appendTo('body');

        $(image).unveil({
            debug: debug,
            loaded: function () {
                assert.ok(image.prop('src').indexOf(imageUrl) > -1, 'Image source should be set');
                image.remove();
                done();
            }
        });
    });

    QUnit.test("Single image with data-src test", function (assert) {
        var done = assert.async(1);
        var image = $('<img/>')
            .addClass('lazy topleft')
            .attr('data-src', uniqueImageUrl())
            .appendTo('body');

        $(image).unveil({
            debug: debug,
            loaded: function () {
                assert.ok(image.prop('src').indexOf(imageUrl) > -1, 'Image source should now be set');
                image.remove();
                done();
            }
        });
    });

    QUnit.test("Placeholder test", function (assert) {
        var done = assert.async(1);
        var image = $('<img/>')
            .addClass('lazy topleft')
            .attr('src', uniqueImageUrl())
            .attr('data-src-placeholder', unusedUrl)
            .appendTo('body');

        $(image).unveil({
            debug: debug,
            loaded: function () {
                assert.ok(image.prop('src').indexOf(imageUrl) > -1, 'Image source should now be set');
                image.remove();
                done();
            }
        });

        assert.ok(image.prop('src').indexOf(unusedUrl) > -1, 'Placeholder should now be set');
    });

    QUnit.test("Scroll test", function (assert) {
        var done = assert.async(1);
        var image = $('<img/>')
            .addClass('lazy waydown')
            .attr('data-src', uniqueImageUrl())
            .appendTo('body');

        $(image).unveil({
            debug: debug,
            loaded: function () {
                assert.ok(image.prop('src').indexOf(imageUrl) > -1, 'Image source should now be set');
                $(window).scrollTop(0);
                image.remove();
                done();
            }
        });

        assert.ok(image.prop('src').indexOf(imageUrl) === -1, 'Image source should not be set');
        $(window).scrollTop(2000).trigger('scroll');
    });

    QUnit.test("Retina image test", function (assert) {
        var done = assert.async(1);
        var image = $('<img/>')
            .addClass('lazy topleft')
            .attr('data-src', 'unused.jpg|' + uniqueImageUrl())
            .appendTo('body');

        $(image).unveil({
            debug: debug,
            retina: true,
            loaded: function () {
                assert.ok(image.prop('src').indexOf(imageUrl) > -1, 'Image source should now be set');
                image.remove();
                done();
            }
        });
    });

    QUnit.test("Background image test", function (assert) {
        var done = assert.async(1);
        var header = $('<header/>')
            .addClass('lazy topleft')
            .attr('data-src', uniqueImageUrl())
            .appendTo('body');

        $(header).unveil({
            debug: debug,
            loaded: function () {
                assert.ok(header.css('backgroundImage').indexOf(imageUrl) > -1, 'DIV background-url should now be set');
                header.remove();
                done();
            }
        });
    });

    QUnit.test("Classes test", function (assert) {
        assert.expect(2);
        var done1 = assert.async(),
            done2 = assert.async(),
            image = $('<img/>')
                .addClass('lazy topleft')
                .attr('src', uniqueImageUrl())
                .appendTo('body');

        $(image).unveil({
            debug: debug,
            loading: function () {
                assert.ok(image.hasClass('unveil-loading'), 'Loading class should be set');
                done1();
            },
            loaded: function () {
                assert.ok(image.hasClass('unveil-loaded'), 'Loaded class should be set');
                image.remove();
                done2();
            }
        });
    });

}());