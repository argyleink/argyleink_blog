var argyleink 	= {}
  , baseScripts
  , appScripts;

baseScripts = [
	  "js/zepto.min.js"
	, "js/hammer.min.js"
	, "prefix"
	//, "js/requestAnimationFrame.js"
];

appScripts = [
	  "carousel"
	, "snap"
	, "menu" 
];

argyleink.baseScriptsLoaded = function() {
	require(appScripts, argyleink.scriptsLoaded);
	Zepto('.main').css({'height': window.innerHeight - 40 + 'px'});
}

argyleink.scriptsLoaded = function() {
	argyleink.socialCarousel = new argyleink.Carousel("#social", carouselReady).init();
	argyleink.postsCarousel = new argyleink.Carousel("#posts", carouselReady).init();
	argyleink.workCarousel = new argyleink.Carousel("#work", carouselReady).init();
	argyleink.labsCarousel = new argyleink.Carousel("#labs", carouselReady).init();

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