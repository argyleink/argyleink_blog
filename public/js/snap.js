argyleink.Snap = function(el, options) {
	'use strict';

	var element   = el
      , position  = {
            startY:     options.start || 0
          , currentY:   options.start || 0
      }
      , settings  = {
            min: options.min || 0
          , max: options.max || 200
          , dragThreshold: options.dragThreshold || 100
      }
      , debug     = options.debug || false
    ;

	function init() {
		Hammer(element, { 
            drag_lock_to_axis: true 
        }).on(
            "release dragup dragdown swipeup swipedown", 
            $.proxy(watch, this)
        );
	}

	function watch(e) {
        e.gesture.preventDefault();

        switch(e.type) {
            case 'dragup':
            case 'dragdown':
                
                var diff = e.gesture.deltaY
                  , newY = position.currentY + diff;

                //if (Math.abs(newY) < Math.abs(settings.max) + 50) {
                    element.css(
                        argyleink.prefix.css + 'transform', 
                        'translate3d(0,' + newY + 'px,0)'
                    );
                //}

                break;

            case 'swipeup':
                debug && console.log('swipe up');
                e.gesture.stopDetect();
                show();
                break;

            case 'swipedown':
                debug && console.log('swipe down');
                e.gesture.stopDetect();
                hide();
                break;

            case 'release':
                
                switch(e.gesture.direction) {
                    case "up":
                        (Math.abs(e.gesture.deltaY) > settings.dragThreshold) ? show() : hide();
                        break;
                    case "down":
                        (Math.abs(e.gesture.deltaY) < settings.dragThreshold) ? show() : hide();
                        break;
                }

                break;
        }
    }

    function show() {
        debug && console.log('show');

        element.animate({
            translate3d: '0,0,0'
        }, 100, 'ease-out');
        position.currentY = 0;
    }

    function hide() {
        debug && console.log('hide');

        element.animate({
            translate3d: '0,'+position.startY+'px,0'
        }, 100, 'ease-out');
        position.currentY = position.startY;
    }

    init();

	return {
		  show: show
        , hide: hide
	};

}