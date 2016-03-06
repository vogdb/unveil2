/*global
 $, QUnit
 */

(function () {

    "use strict";

    QUnit.config.testTimeout = 2000;

    var imageUrl = 'lazy.jpg',
        debug = false;

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
            .attr('data-src', imageUrl)
            .appendTo('body');

        $(image).unveil({
            debug: debug,
            loaded: function() {
                assert.ok(image.prop('src').indexOf(imageUrl) > -1, 'Image source should now be set');
                image.remove();
                done();
            }
        });
    });

    QUnit.test("Scroll test", function (assert) {
        var done = assert.async(1);
        var image = $('<img/>')
            .addClass('lazy down400')
            .attr('data-src', imageUrl)
            .appendTo('body');

        $(image).unveil({
            debug: debug,
            loaded: function() {
                assert.ok(image.prop('src').indexOf(imageUrl) > -1, 'Image source should now be set');
                $(window).scrollTop(0);
                image.remove();
                done();
            }
        });

        assert.ok(image.prop('src').indexOf(imageUrl) === -1, 'Image source should not be set');
        $(window).scrollTop(400).trigger('scroll');
    });

    QUnit.test("Retina image test", function (assert) {
        var done = assert.async(1);
        var image = $('<img/>')
            .addClass('lazy topleft')
            .attr('data-src', 'unused.jpg|' + imageUrl)
            .appendTo('body');

        $(image).unveil({
            debug: debug,
            retina: true,
            loaded: function() {
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
            .attr('data-src', imageUrl)
            .appendTo('body');

        $(header).unveil({
            debug: debug,
            loaded: function() {
                assert.ok(header.css('backgroundImage').indexOf(imageUrl) > -1, 'DIV background-url should now be set');
                header.remove();
                done();
            }
        });
    });

}());