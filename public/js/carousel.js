argyleink.Carousel = function (element,callback) {
    var self = this;
    element = Zepto(element);

    var cb = callback;

    var container = Zepto(element).find('ol'); 
    var panes = Zepto(element).find('li');

    var pane_width = 0;
    var pane_count = panes.length;

    var current_pane = 0;

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
        setPaneDimensions();

        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
            //updateOffset();
        });

        Hammer(element.find('.next')).on('tap', this.next);
        Hammer(element.find('.prev')).on('tap', this.prev);

        Hammer(element, { drag_lock_to_axis: true })
            .on("release dragleft dragright swipeleft swiperight", handleHammer);
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
        cb(element);
    };


    /**
     * show pane by index
     * @param   {Number}    index
     */
    this.showPane = function( index ) {
        // between the bounds
        index = Math.max(0, Math.min(index, pane_count-1));
        current_pane = index;

        var offset = -((100/pane_count)*current_pane);
        setContainerOffset(offset, true);
    };


    function setContainerOffset(percent, animate) {
        container.removeClass("animate");

        if(animate) {
            container.addClass("animate");
        }

        if(supportsTransitions) {
            container.css(
                argyleink.prefix.css + "transform", 
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
                break;
        }
    }
}