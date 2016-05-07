angular.module('app.directives', [])

.directive('onlyLoggedIn', ['FirebaseUtil', '$compile', function(FirebaseUtil, $compile){
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      scope.firebaseUtil = FirebaseUtil;
      scope.$watch('firebaseUtil.isLoggedIn', function(value) {
        if(value){
          element.removeClass('hidden');
        }else{
          element.addClass('hidden');
        }
      });
    }
  };
}])

.directive('onlyLoggedOut', ['FirebaseUtil', '$compile', function(FirebaseUtil, $compile){
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      scope.firebaseUtil = FirebaseUtil;
      scope.$watch('firebaseUtil.isLoggedIn', function(value) {
        if(value){
          element.addClass('hidden');
        }else{
          element.removeClass('hidden');
        }
      });
    }
  };
}]);

