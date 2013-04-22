argyleink.menu = (function(){
	'use strict';

	var me 		= this
	  , snap
	  , element = Zepto('#nav');

	function init() {
		snap = new argyleink.Snap(element, {
			  min: 0
			, max: 360
			, start: 360
			, dragThreshold: 200
			, debug: true
		});
	}

	// return {
	// 	init: init
	// };

	init();

})();