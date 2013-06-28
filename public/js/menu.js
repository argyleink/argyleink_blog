argyleink.menu = (function(){
	'use strict';

	var snap
	  , element = $('#nav');

	function init() {
		snap = new argyleink.Snap(element, {
			  min: 0
			, max: 30
			, start: 240
			, dragThreshold: 75
			, debug: true
			, button: '#open-footer'
		});
		listen();
	}

	function listen() {
		element.on('click', 'a', navClicked);
	}

	function open() {
		snap.show();
	}

	function close() {
		snap.hide();
	}

	function navClicked(e) {
		console.log(e.target.innerText);
		argyleink.menu.close();
	}

	return {
		init: init
	  ,	open: open
	  , close: close
	};

})();