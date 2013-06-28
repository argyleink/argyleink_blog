argyleink.menu = (function(){
	'use strict';

	var snap
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
		element.on('click', 'a', navClicked);
	}

	function navClicked(e) {
		console.log(e.target.innerText);
		Avgrund.show('#default-popup');
	}

	return {
		init: init
	};

})();