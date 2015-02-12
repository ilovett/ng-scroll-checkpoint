ng-scroll-checkpoint
====================

This module provides a hook for when elements become in or out of view.

# Setup

## Install

    bower install ng-scroll-checkpoint --save

## Enable

Add to module dependencies: 'ngScrollCheckpoint'

```
angular.module('myApp', ['ngScrollCheckpoint'])
```

# Example

You can supply an expression or callback function and use `inView` as an argument which is a boolean value of whether or not the element is in view.

## Callback Example
```
<div class="fade-example" ng-scroll-checkpoint="whenVisible(inView)">
  Blah blah blah
</div>


$scope.whenVisible = function(inView) {
  // do something
}

```

## Expression Example
```
<div class="fade-example" ng-scroll-checkpoint="model.visible = inView">
  This will be visible...
</div>

<div ng-if="model.visible">
  Will render when above element is in view
</div>
```
