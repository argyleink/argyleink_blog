var argyleink = {};

argyleink.baseScriptsLoaded = function() {
	require(["js/carousel.js"], argyleink.scriptsLoaded);
}

argyleink.scriptsLoaded = function() {
	argyleink.socialCarousel = new Carousel("#social", carouselReady).init();
	argyleink.postsCarousel = new Carousel("#posts", carouselReady).init();
	argyleink.workCarousel = new Carousel("#work", carouselReady).init();
	argyleink.labsCarousel = new Carousel("#labs", carouselReady).init();

	function carouselReady(el) {
		$(el).removeClass('out');
	}
}

require(
	[
		  "js/zepto.min.js"
		, "js/hammer.min.js"
		//, "js/requestAnimationFrame.js"
	], 
	argyleink.baseScriptsLoaded
);