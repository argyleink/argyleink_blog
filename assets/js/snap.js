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
          , menuBtn: options.button || null
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
        if (settings.menuBtn)
            Hammer(element.find(settings.menuBtn)).on('tap', $.proxy(toggle, this))
	}

	function watch(e) {
        e.gesture.preventDefault();

        switch(e.type) {
            case 'dragup':
            case 'dragdown':
                
                var diff = e.gesture.deltaY
                  , newY = position.currentY + diff;

                element.css(
                    'transform', 
                    'translate3d(0,' + newY + 'px,0)'
                );
                
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

        position.currentY = 0;
        animate(position.currentY);
    }

    function hide() {
        debug && console.log('hide');

        position.currentY = position.startY;
        animate(position.currentY);
    }

    function toggle() {
        debug && console.log('toggle');

        position.currentY = (position.currentY === position.startY) ? position.max : position.startY;

        animate(position.currentY);
    }

    function animate(val) {
        element.translate3d({
              x: 0
            , y: val
            , z: 0
        }, 100);
    }

    init();

	return {
		  show: show
        , hide: hide
        , toggle: toggle
	};

}