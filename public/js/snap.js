argyleink.Snap=function(e,t){"use strict";function n(){Hammer(a,{drag_lock_to_axis:!0}).on("release dragup dragdown swipeup swipedown",$.proxy(r,this))}function r(e){switch(e.gesture.preventDefault(),e.type){case"dragup":case"dragdown":var t=e.gesture.deltaY,n=s.currentY+t;a.css("transform","translate3d(0,"+n+"px,0)");break;case"swipeup":c&&console.log("swipe up"),e.gesture.stopDetect(),i();break;case"swipedown":c&&console.log("swipe down"),e.gesture.stopDetect(),o();break;case"release":switch(e.gesture.direction){case"up":Math.abs(e.gesture.deltaY)>u.dragThreshold?i():o();break;case"down":Math.abs(e.gesture.deltaY)<u.dragThreshold?i():o()}}}function i(){c&&console.log("show"),s.currentY=0,a.translate3d({x:0,y:0,z:0},100,"ease-out")}function o(){c&&console.log("hide"),s.currentY=s.startY,a.translate3d({x:0,y:s.currentY,z:0})}var a=e,s={startY:t.start||0,currentY:t.start||0},u={min:t.min||0,max:t.max||200,dragThreshold:t.dragThreshold||100},c=t.debug||!1;return n(),{show:i,hide:o}};