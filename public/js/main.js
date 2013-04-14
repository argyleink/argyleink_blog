var argyleink = {};

argyleink.scriptsLoaded = function() {
	argyleink.nav = responsiveNav("#nav", { 
		label: 			"Menu", 	// String: Label for the navigation toggle
		insert: 		"after", 	// String: Insert the toggle before or after the navigation
		customToggle: 	"toggle", 	// Selector: Specify the ID of a custom toggle
		init: function(){}, 		// Function: Init callback
		open: function(){}, 		// Function: Open callback
		close: function(){} 		// Function: Close callback
	});
}

require(["js/responsive-nav.min.js"], argyleink.scriptsLoaded);