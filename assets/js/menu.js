argyleink.menu = (function(){
	'use strict';

	var me 		= this
	  , snap
	  , element = Zepto('#nav');

	function init() {
		snap = new argyleink.Snap(element, {
			  min: 0
			, max: 30
			, start: 365
			, dragThreshold: 100
			, debug: true
		});
		listen();
	}

	function listen() {
		element.on('click', navClicked);
	}

	function navClicked(e) {
		console.log(e.target);
	}

	// return {
	// 	init: init
	// };

	init();

})();