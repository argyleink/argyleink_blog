argyleink.Carousel=function(e,t){function n(){u=e.width(),c.each(function(){$(this).width(u)}),o.width(u*l),s(e)}function r(e,t){if(o.removeClass("animate"),t&&o.addClass("animate"),p)o.css(argyleink.prefix.css+"transform","translate3d("+e+"%,0,0) scale3d(1,1,1)");else{var n=u*l/100*e;o.css("left",n+"px")}}function i(e){switch(e.gesture.preventDefault(),e.type){case"dragright":case"dragleft":var t=-(100/l)*h,n=100/u*e.gesture.deltaX/l;r(n+t);break;case"swipeleft":a.next(),e.gesture.stopDetect();break;case"swiperight":a.prev(),e.gesture.stopDetect();break;case"release":Math.abs(e.gesture.deltaX)>u/3?"right"==e.gesture.direction?a.prev():a.next():a.showPane(h,!0)}}var a=this;e=Zepto(e);var s=t,o=Zepto(e).find("ol"),c=Zepto(e).find("li"),u=0,l=c.length,h=0,p=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(""==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1}();this.init=function(){n(),$(window).on("load resize orientationchange",function(){n()}),Hammer(e.find(".next")).on("tap",this.next),Hammer(e.find(".prev")).on("tap",this.prev),Hammer(e,{drag_lock_to_axis:!0}).on("release dragleft dragright swipeleft swiperight",i)},this.showPane=function(e){e=Math.max(0,Math.min(e,l-1)),h=e;var t=-(100/l*h);r(t,!0)},this.next=function(){return a.showPane(h+1,!0)},this.prev=function(){return a.showPane(h-1,!0)}};