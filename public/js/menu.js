argyleink.menu = (function(){
	'use strict';

	var me 		= this
	  , snap
	  , element = $('#nav');

	function init() {
		snap = new argyleink.Snap(element, {
			  min: 0
			, max: 30
			, start: 200
			, dragThreshold: 75
			, debug: true
			, button: '#open-footer'
		});
		listen();
	}

	function listen() {
		element.on('click', navClicked);
	}

	function navClicked(e) {
		console.log(e.target + ": " + me);
	}

	return {
		init: init
	};

})();