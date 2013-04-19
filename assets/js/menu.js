argyleink.menu = (function(){

	function init() {
		Hammer($('#nav')).on("dragup", hammerDrag);
	}

	function hammerDrag(e) {
		e.gesture.preventDefault();
		var newY = $(this).css(argyleink.prefix.css + 'transform');

		$(this).css(
			argyleink.prefix.css + 'transform', 
			'translateY(' + e.gesture.deltaY + 'px)'
		);
	}

	// return {
	// 	init: init
	// }

	init();

})();