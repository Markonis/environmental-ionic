angular.module('app.controllers', [])

.controller('menuCtrl', ['$scope', '$state', 'FirebaseUtil', function($scope, $state, FirebaseUtil) {
  $scope.logout = function() {
    FirebaseUtil.logout();
  }

  $scope.newHazard = function () {
    $state.go('menu.hazard', {hazardId: 'new'});
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
        $state.go('menu.map');
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
        $state.go('menu.map');
      })
      .catch(function (error) {
        alert("There was an error when signing up.")
      });
  }
}])

.controller('allHazardsCtrl', ['$scope', '$state', 'FirebaseArray', function($scope, $state, FirebaseArray) {
  $scope.hazardsArray = new FirebaseArray('hazards');

  $scope.openHazard = function(hazard) {
    $state.go('menu.hazard', {hazardId: hazard.$id});
  }
}])

.controller('hazardCtrl', ['$scope', '$state', '$ionicHistory', '$stateParams', 'FirebaseUtil', 'FirebaseArray', 'Geolocation', function($scope, $state, $ionicHistory, $stateParams, FirebaseUtil, FirebaseArray, Geolocation) {
  var hazardsArray = new FirebaseArray('hazards');
  $scope.hazardId = $stateParams.hazardId;

  function createNewHazard() {
    $scope.hazard = {
      location: {lat: 0, lng: 0},
      title: '', description: '', photo: ''
    }
    Geolocation.getLocation().then(function(location) {
      $scope.hazard.location = location;
    });
  }

  if($scope.hazardId === 'new'){
    createNewHazard();
  }else{
    hazardsArray.load().then(function () {
      $scope.hazard = hazardsArray.get($stateParams.hazardId);
    });
  }

  $scope.save = function () {
    if($scope.hazardId === 'new'){
      hazardsArray.add($scope.hazard).then(function (record) {
        $scope.hazard = hazardsArray.get(record.key());
        $scope.hazardId = $scope.hazard.$id;
      });
    }else{
      hazardsArray.save($scope.hazard);
    }
  }

  $scope.delete = function () {
    if($scope.hazardId != 'new'){
      hazardsArray.delete($scope.hazard).then(function(){
        $ionicHistory.nextViewOptions({ disableBack: true });
        $state.go('menu.allHazards');
      });
    }
  }

  $scope.takePhoto = function () {
    // Camera.takePhoto().then(function(img) {
    //   $scope.hazard.photo = img;
    // });
  }
}])

.controller('aboutCtrl', function($scope) {

})
