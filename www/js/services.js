angular.module('app.services', ['firebase'])

.service('FirebaseUtil', ['$firebaseAuth', function($firebaseAuth) {
  var ref = new Firebase("https://fiery-torch-7446.firebaseio.com");
  var authObj = $firebaseAuth(ref);
  var service = {
    createUser: function(email, password) {
      return authObj.$createUser({
        email: email,
        password: password
      });
    },

    login: function(email, password) {
      return authObj.$authWithPassword({
        email: email,
        password: password
      }).then(function() {
        service.isLoggedIn = true;
      });
    },

    logout: function() {
      authObj.$unauth();
      service.isLoggedIn = false;
    },

    isLoggedIn: false
  }

  return service;
}]);

