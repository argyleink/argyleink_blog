var argyleink = {};

argyleink.scriptsLoaded = function() {
	argyleink.socialCarousel = new Carousel("#social", carouselReady).init();
	argyleink.postsCarousel = new Carousel("#posts", carouselReady).init();
	argyleink.workCarousel = new Carousel("#work", carouselReady).init();

	function carouselReady(el) {
		$(el).removeClass('out');
	}
}

require(
	[
		  "http://raw.github.com/EightMedia/hammer.js/master/dist/jquery.hammer.min.js"
		, "http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"
		, "js/requestAnimationFrame.js"
		, "js/carousel.js"
	], 
	argyleink.scriptsLoaded
);