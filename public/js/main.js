var argyleink 	= {}
  , baseScripts
  , appScripts;

baseScripts = [
	  "//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"
	, "js/hammer.js"
];

appScripts = [
	  "js/jquery.animate3d.js"
	, "carousel"
	, "snap"
	, "menu" 
];

argyleink.baseScriptsLoaded = function() {
	require(appScripts, argyleink.scriptsLoaded);
	$('.main').css({'height': window.innerHeight - 40 + 'px'});
}

argyleink.scriptsLoaded = function() {
	var social 	= new argyleink.Carousel("#social")
	  , posts 	= new argyleink.Carousel("#posts")
	  , work 	= new argyleink.Carousel("#work")
	  , labs 	= new argyleink.Carousel("#labs");
	
	work.init().then(labs.init).then(posts.init).then(social.init).done(function(){
		console.log('carousels done');
	});

	argyleink.init();
}

argyleink.init = function() {
	argyleink.menu.init();
	argyleink.initListeners();
}

argyleink.initListeners = function() {
	Hammer(document.body).on("pinchin", function() {
	    alert('show menu');
	});
}

require(baseScripts, argyleink.baseScriptsLoaded);