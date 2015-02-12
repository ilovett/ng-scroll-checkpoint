(function (window, angular, undefined) {

  'use strict';

  angular.module('ngScrollCheckpoint', [])
    .directive('ngScrollCheckpoint', function ($window, $parse) {
      return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {

          var options, $w, inView;

          options = scope.$eval(attrs.ngScrollCheckpointOptions) || {};
          options.top = options.top || 100;
          options.bottom = options.bottom || 100;

          $w = angular.element($window);

          function inViewCheck($event, b, c) {

            var checkpoints, el, newInView;

            checkpoints = {};
            checkpoints.top = $w.scrollTop() + options.bottom;
            checkpoints.bottom = $w.scrollTop() + $w.height() - options.top;

            el = {};
            el.top = element.offset().top;
            el.bottom = element.offset().top + element.height();

            // determine if element is in view
            newInView = (el.top < checkpoints.bottom && el.bottom > checkpoints.top);

            // if inView has changed fire the listener expression
            if (newInView !== inView) {
              $parse(attrs.ngScrollCheckpoint)(scope, {
                inView: newInView
              });
            }

            // save new inView state
            inView = newInView;

            // apply if digest not in progress
            !scope.$$phase && scope.$apply();

          }

          // add listener on scrolling and fire listener immediately
          $w.on('scroll', inViewCheck);
          inViewCheck();

        }
      };
    });

})(window, window.angular);
