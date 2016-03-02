/*global
 $, QUnit
 */

(function () {

    "use strict";

    QUnit.config.testTimeout = 10000;

    var imageUrl = 'lazy.jpg';

    QUnit.test("Basic test", function (assert) {
        // Some basic tests if initial behaviour is consistent
        assert.equal(typeof $.fn.unveil, 'function', 'Unveil should be loaded');
        assert.equal($('').unveil().length, 0, 'Unveil without arguments should return empty array');
        assert.equal($('<div/>').unveil()[0].nodeName, 'DIV', 'Unveil with div should just return the DIV');
    });

    QUnit.test("Single image test", function (assert) {
        var done = assert.async(1);
        var image = $('<img/>')
            .addClass('lazy')
            .attr('data-src', imageUrl)
            .appendTo('body');

        $(image).unveil({
            loaded: function() {
                assert.ok(image.prop('src').indexOf(imageUrl) > -1, 'Image source should now be set');
                image.remove();
                done();
            }
        });
    });

    QUnit.test("Background image test", function (assert) {
        var done = assert.async(1);
        var image = $('<div/>')
            .addClass('lazy')
            .attr('data-src', imageUrl)
            .appendTo('body');

        $(image).unveil({
            loaded: function() {
                assert.ok(image.css('backgroundImage').indexOf(imageUrl) > -1, 'DIV background-url should now be set');
                image.remove();
                done();
            }
        });
    });

}());