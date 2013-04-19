var argyleink 	= {}
  , baseScripts
  , appScripts;

baseScripts = [
	  "js/zepto.min.js"
	, "js/hammer.min.js"
	, "js/prefix.js"
	//, "js/requestAnimationFrame.js"
];

appScripts = [
	  "js/carousel.js"
	, "menu" 
];

argyleink.baseScriptsLoaded = function() {
	require(appScripts, argyleink.scriptsLoaded);
}

argyleink.scriptsLoaded = function() {
	argyleink.socialCarousel = new Carousel("#social", carouselReady).init();
	argyleink.postsCarousel = new Carousel("#posts", carouselReady).init();
	argyleink.workCarousel = new Carousel("#work", carouselReady).init();
	argyleink.labsCarousel = new Carousel("#labs", carouselReady).init();

	function carouselReady(el) {
		$(el).removeClass('out');
	}

	argyleink.init();
}

argyleink.init = function() {
	argyleink.initListeners();
}

argyleink.initListeners = function() {
	Hammer(document.body).on("pinchin", function() {
	    alert('show menu');
	});
}

require(baseScripts, argyleink.baseScriptsLoaded);