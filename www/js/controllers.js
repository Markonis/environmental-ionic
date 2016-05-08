angular.module('app.controllers', [])

.controller('menuCtrl', ['$scope', 'FirebaseUtil', function($scope, FirebaseUtil) {
  $scope.logout = function() {
    FirebaseUtil.logout();
  }
}])

.controller('mapCtrl', ['$scope', 'FirebaseArray', function($scope, FirebaseArray) {
  $scope.hazardsArray = new FirebaseArray("hazards");
}])

.controller('loginCtrl', ['$scope', '$state', '$ionicHistory', 'FirebaseUtil', function($scope, $state, $ionicHistory, FirebaseUtil) {
  $scope.login = function(email, password) {
    FirebaseUtil.login(email, password)
      .then(function (data) {
        $ionicHistory.nextViewOptions({ disableBack: true });
        $state.go('menu.allHazards');
      })
      .catch(function (error) {
        alert("There was an error when signing in.")
      });
  }
}])

.controller('signupCtrl', ['$scope', '$state', '$ionicHistory', 'FirebaseUtil', function($scope, $state, $ionicHistory, FirebaseUtil) {
  $scope.createUser = function(email, password) {
    FirebaseUtil.createUser(email, password)
      .then(function (data) {
        return FirebaseUtil.login(email, password);
      })
      .then(function (data) {
        $ionicHistory.nextViewOptions({ disableBack: true });
        $state.go('menu.allHazards');
      })
      .catch(function (error) {
        alert("There was an error when signing up.")
      });
  }
}])

.controller('allHazardsCtrl', function($scope) {

})

.controller('hazardCtrl', function($scope) {

})

.controller('aboutCtrl', function($scope) {

})
