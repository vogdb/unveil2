QUnit.test("Basic test", function( assert ) {

	// Some basic tests if initial behaviour is consistent
	assert.equal(typeof($.fn.unveil), 'function', 'Unveil should be loaded');
	assert.equal($.fn.unveil().length, 0, 'Unveil without arguments should return empty array');
	assert.equal($('#emptydiv').unveil()[0].nodeName, 'DIV', 'Unveil with div should just return the DIV');

});