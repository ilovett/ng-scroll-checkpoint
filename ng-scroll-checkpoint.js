(function (window, angular, undefined) {

  'use strict';

  angular.module('ngScrollCheckpoint', [])
    .directive('ngScrollCheckpoint', function ($window, $parse, $timeout) {
      return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {

          var options, $w, show;

          // default options
          options = scope.$eval(attrs.ngScrollCheckpointOptions) || {};
          options.threshold = options.threshold || 0;
          options.once = typeof options.once === 'boolean' ? options.once : true;

          $w = angular.element($window);

          // start hidden
          show = false;

          function showCheck($event) {

            var threshold, pos, showTemp;

            // calculate if threshold has been crossed
            threshold = $w.scrollTop() + $w.height() - options.threshold;
            pos = element.offset().top;
            showTemp = (threshold > pos);

            // evaluate expression if visible has changed
            if (showTemp !== show) {

              // save new show state
              show = showTemp;

              // evaluate expression and pass variables
              $parse(attrs.ngScrollCheckpoint)(scope, { show: show });

              // disable the listener if visible
              if (show === true && options.once) {
                $w.off('scroll', showCheck);
              }
            }

            scope.$apply();

          }

          // add listener on scrolling and fire listener immediately
          $w.on('scroll', showCheck);
          $timeout(showCheck, 500);

        }
      };
    });

})(window, window.angular);
