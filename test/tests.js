/*global
 $, QUnit
 */

(function () {

    "use strict";

    QUnit.config.testTimeout = 10000;

    var placeholderUrl = 'http://placehold.it/500x300/C8D3DC?text=placeholder',
        imageUrl = 'http://loremflickr.com/100/100';

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
                assert.equal(image.prop('src'), imageUrl, 'Image source should now be set');
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
                assert.equal(image.css('backgroundImage'), 'url("' + imageUrl + '")', 'DIV background-url should now be set');
                image.remove();
                done();
            }
        });
    });

}());