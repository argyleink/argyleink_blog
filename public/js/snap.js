argyleink.Snap=function(e,t){"use strict";function n(){Hammer(a,{drag_lock_to_axis:!0}).on("release dragup dragdown swipeup swipedown",$.proxy(r,this))}function r(e){switch(e.gesture.preventDefault(),e.type){case"dragup":case"dragdown":var t=e.gesture.deltaY,n=s.currentY+t;Math.abs(n)<Math.abs(u.max)+50&&a.css(argyleink.prefix.css+"transform","translate3d(0,"+n+"px,0)");break;case"swipeup":c&&console.log("swipe up"),e.gesture.stopDetect(),i();break;case"swipedown":c&&console.log("swipe down"),e.gesture.stopDetect(),o();break;case"release":s.currentY+=e.gesture.deltaY,Math.abs(s.currentY)>u.dragThreshold?i():o()}}function i(){c&&console.log("show"),a.animate({translate3d:"0,"+u.max+"px,0"},100,"ease-out"),s.currentY=u.max}function o(){c&&console.log("hide"),a.animate({translate3d:"0,0,0"},100,"ease-out"),s.currentY=u.min}var a=e,s={startY:t.start||0,currentY:t.start||0},u={min:t.min||0,max:t.max||200,dragThreshold:t.dragThreshold||100},c=t.debug||!1;return n(),{show:i,hide:o}};