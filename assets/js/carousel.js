argyleink.Carousel = function (element) {
    'use strict';

    var self            = this
      , container       = $(element).find('ol')
      , panes           = $(element).find('li')
      , arrows          = $(element).find('.btn-nav')
      , swiped          = false
      , pane_width      = 0
      , pane_count      = panes.length
      , current_pane    = 0;
    
    element = $(element);

    var supportsTransitions  = (function() {
        var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
            v = ['ms','O','Moz','Webkit']; // 'v' for vendor

        if( s['transition'] == '' ) return true; // check first for prefeixed-free support
        while( v.length ) // now go over the list of vendor prefixes and check support until one is found
            if( v.pop() + 'Transition' in s )
                return true;
        return false;
    })();


    /**
     * initial
     */
    this.init = function() {
        var deferred = $.Deferred();

        // container.css(
        //     "transform", 
        //     "translate3d(0,10px,0) scale3d(1,1,1)"
        // );

        setPaneDimensions();

        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
        });

        Hammer(element.find('.next')).on('tap', self.next);
        Hammer(element.find('.prev')).on('tap', self.prev);

        Hammer(element, { drag_lock_to_axis: true })
            .on("release dragleft dragright swipeleft swiperight", handleHammer);

        self.showPane(0, function(){
            container.translate3d({
                  x: 0
                , y: 0
                , z: 0
            }, 1550, 'ease-out', function(){
                deferred.resolve(element);
            });
            container.css(
                "opacity", 
                1
            );
        });

        return deferred.promise();
    };


    /**
     * set the pane dimensions and scale the container
     */
    function setPaneDimensions() {
        pane_width = element.width();
        panes.each(function() {
            $(this).width(pane_width);
        });
        container.width(pane_width*pane_count);
    };


    /**
     * show pane by index
     * @param   {Number}    index
     */
    this.showPane = function( index, callback ) {
        // between the bounds
        index = Math.max(0, Math.min(index, pane_count-1));
        current_pane = index;

        var offset = -((100/pane_count)*current_pane);

        container.translate3d({
              x: offset + '%'
            , y: 0
            , z: 0
        }, 200, 'ease-out', $.proxy(callback, self));
    };

    this.showPaneComplete = function() {
        // cb(element);
    }


    function setContainerOffset(percent, animate) {
        if(supportsTransitions) {
            container.css(
                "transform", 
                "translate3d("+ percent +"%,0,0) scale3d(1,1,1)"
            );
        }
        else {
            var px = ((pane_width*pane_count) / 100) * percent;
            container.css("left", px+"px");
        }
    }

    this.next = function() { 
        return self.showPane(current_pane+1, true); 
    };
    this.prev = function() { 
        return self.showPane(current_pane-1, true); 
    };

    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch(ev.type) {
            case 'dragright':
            case 'dragleft':
                // stick to the finger
                var pane_offset = -(100/pane_count)*current_pane;
                var drag_offset = ((100/pane_width)*ev.gesture.deltaX) / pane_count;

                setContainerOffset(drag_offset + pane_offset);
                break;

            case 'swipeleft':
                self.next();
                ev.gesture.stopDetect();
                break;

            case 'swiperight':
                self.prev();
                ev.gesture.stopDetect();
                break;

            case 'release':
                // more then 50% moved, navigate
                if(Math.abs(ev.gesture.deltaX) > pane_width/3) {
                    if(ev.gesture.direction == 'right') {
                        self.prev();
                    } else {
                        self.next();
                    }
                }
                else {
                    self.showPane(current_pane, true);
                }
                if (!swiped) arrows.addClass('out');
                break;
        }
    }
}