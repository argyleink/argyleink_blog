argyleink.Carousel=function(e){"use strict";function t(){u=e.width(),i.each(function(){$(this).width(u)}),a.width(u*l)}function n(e){if(d)a.css("transform","translate3d("+e+"%,0,0) scale3d(1,1,1)");else{var t=u*l/100*e;a.css("left",t+"px")}}function r(e){switch(e.gesture.preventDefault(),e.type){case"dragright":case"dragleft":var t=-(100/l)*f,r=100/u*e.gesture.deltaX/l;n(r+t);break;case"swipeleft":s.next(),e.gesture.stopDetect();break;case"swiperight":s.prev(),e.gesture.stopDetect();break;case"release":Math.abs(e.gesture.deltaX)>u/3?"right"==e.gesture.direction?s.prev():s.next():s.showPane(f,!0),c||o.addClass("out")}}var s=this,a=$(e).find("ol"),i=$(e).find("li"),o=$(e).find(".btn-nav"),c=!1,u=0,l=i.length,f=0;e=$(e);var d=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(""==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1}();this.init=function(){var n=$.Deferred();return a.css("transform","translate3d(50px,0,0) scale3d(1,1,1)"),t(),$(window).on("load resize orientationchange",function(){t()}),Hammer(e.find(".next")).on("tap",s.next),Hammer(e.find(".prev")).on("tap",s.prev),Hammer(e,{drag_lock_to_axis:!0}).on("release dragleft dragright swipeleft swiperight",r),s.showPane(0,function(){a.translate3d({x:0,y:0,z:0},150,"ease-out",function(){n.resolve(e)}).css("opacity",1)}),n.promise()},this.showPane=function(e,t){e=Math.max(0,Math.min(e,l-1)),f=e;var n=-(100/l*f);a.translate3d({x:n+"%",y:0,z:0},200,"ease-out",$.proxy(t,s))},this.showPaneComplete=function(){},this.next=function(){return s.showPane(f+1,!0)},this.prev=function(){return s.showPane(f-1,!0)}};