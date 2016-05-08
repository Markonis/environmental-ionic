angular.module('app.controllers', [])

.controller('menuCtrl', ['$scope', 'FirebaseUtil', function($scope, FirebaseUtil) {
  $scope.logout = function() {
    FirebaseUtil.logout();
  }
}])

.controller('mapCtrl', ['$scope', 'FirebaseArray', function($scope, FirebaseArray) {
  $scope.hazardsArray = new FirebaseArray("hazards");
}])

.controller('loginCtrl', ['$scope', 'FirebaseUtil', '$state', function($scope, FirebaseUtil, $state) {
  $scope.login = function(email, password) {
    FirebaseUtil.login(email, password)
      .then(function (data) {
        $state.go('menu.allHazards');
      })
      .catch(function (error) {
        alert("There was an error when signing in.")
      });
  }
}])

.controller('signupCtrl', ['$scope', 'FirebaseUtil', '$state', function($scope, FirebaseUtil, $state) {
  $scope.createUser = function(email, password) {
    FirebaseUtil.createUser(email, password)
      .then(function (data) {
        return FirebaseUtil.login(email, password);
      })
      .then(function (data) {
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
