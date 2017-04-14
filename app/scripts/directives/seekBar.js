(function() {
    function seekBar($document) {

         /**
         * @function calculatePercent
         * @desc when user clicks on seekbar, where the click happened is recorded as a percent of seekbar width
         * @return {Number} - percent of seekbar width where click ocured
         */
         var calculatePercent = function(seekBar, event) {
             var offsetX = event.pageX - seekBar.offset().left;
             var seekBarWidth = seekBar.width();
             var offsetXPercent = offsetX / seekBarWidth;
             offsetXPercent = Math.max(0, offsetXPercent);
             offsetXPercent = Math.min(1, offsetXPercent);
             return offsetXPercent;
         };


        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
	        scope: { },
	        link: function(scope, element, attributes) {
                 scope.value = 0;
                 scope.max = 100;
     
                 var seekBar = $(element);

                 /**
                 * @function perecentString
                 * @desc updtaes seek percentage
                 * @return {string} percent number + %
                 */
                 var percentString = function () {
                     var value = scope.value;
                     var max = scope.max;
                     var percent = value / max * 100;
                     return percent + "%";
                 };
     
                 /**
                 * @function fillStyle
                 * @desc fills element bar to percentString value 
                 * @return {css} sets width property
                 */     
                 scope.fillStyle = function() {
                     return {width: percentString()};
                 };
                 /**
                 * @function onClickSeekBar
                 * @desc sets seekbar value to where event click takes place
                 * @param {event}
                 */   
                 scope.onClickSeekBar = function(event) {
                     var percent = calculatePercent(seekBar, event);
                     scope.value = percent * scope.max;
                 };
                 /**
                 * @function trackThumb
                 * @desc sets seek bar value when thumb is dragged as its happening
                 */
                 scope.trackThumb = function() {
                     $document.bind('mousemove.thumb', function(event) {
                         var percent = calculatePercent(seekBar, event);
                         scope.$apply(function() {
                             scope.value = percent * scope.max;
                         });
                     });
                 
                     $document.bind('mouseup.thumb', function() {
                         $document.unbind('mousemove.thumb');
                         $document.unbind('mouseup.thumb');
                     });
                 };
                 /**
                 * @function thumbStyle
                 * @desc moves .thumb to value of the click event or mousedown event
                 * @return {css} sets thumb left property
                 */
                 scope.thumbStyle = function() {
                    return {left: percentString()}; 
                 };

	        }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
