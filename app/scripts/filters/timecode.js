(function() {
    function timecode() {
        return function(seconds) {
             var timer = null;
             timer = buzz.toTimer(seconds);
             if (timer.charAt(0) === '0') {
                return timer.substring(1);
             }
             return timer;

             /*
             var seconds = Number.parseFloat(seconds);

             if (Number.isNaN(seconds)) {
                 return '-:--';
             }

             var wholeSeconds = Math.floor(seconds);
             var minutes = Math.floor(wholeSeconds / 60);
             var remainingSeconds = wholeSeconds % 60;
 
             var output = minutes + ':';
 
             if (remainingSeconds < 10) {
                 output += '0';   
             }
 
             output += remainingSeconds;
 
             return output;
             */
        };
    }

    angular 
        .module('blocJams')
        .filter('timecode', timecode);
})();