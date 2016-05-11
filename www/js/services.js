angular.module('app.services', ['firebase'])

.service('LocalStorage', ['$localStorage', function($localStorage) {
  if(!$localStorage.environmentalHazards){
    $localStorage.environmentalHazards = {};
  }
  return {
    set: function (key, value) {
      $localStorage.environmentalHazards[key] = value;
    },

    get: function (key) {
      return $localStorage.environmentalHazards[key];
    }
  }
}])

.service('FirebaseSession', ['$firebaseAuth', 'LocalStorage', function($firebaseAuth, LocalStorage) {
  var ref = new Firebase("https://fiery-torch-7446.firebaseio.com");
  var authObj = $firebaseAuth(ref);
  var service = { isLoggedIn: false };

  function rememberUser(email, password) {
    LocalStorage.set("email", email);
    LocalStorage.set("password", password);
  }

  function forgetUser() {
    LocalStorage.set("email", null);
    LocalStorage.set("password", null);
  }

  function login(email, password) {
    return authObj.$authWithPassword({
      email: email,
      password: password
    }).then(function() {
      rememberUser(email, password);
      service.isLoggedIn = true;
    });
  }

  function restoreSession() {
    var email = LocalStorage.get("email");
    var password = LocalStorage.get("password");
    if(email && password){
      login(email, password);
    }
  }

  service.createUser = function(email, password) {
    return authObj.$createUser({
      email: email,
      password: password
    });
  };

  service.login = function(email, password) {
    return login(email, password);
  };

  service.logout = function() {
    forgetUser();
    authObj.$unauth();
    service.isLoggedIn = false;
  };

  restoreSession();

  return service;
}])

.service('FirebaseArray', ['$firebaseArray', function($firebaseArray) {
  return function(path) {
    var me = this;
    var ref = new Firebase("https://fiery-torch-7446.firebaseio.com/" + path);
    var array = $firebaseArray(ref);
    me.items = array;

    array.$watch(function(event){
      me.items = [];
      for(var i = 0; i < array.length; i++){
        me.items.push(array[i]);
      }
    });

    me.get = function (id) {
      return array.$getRecord(id);
    }

    me.load = function () {
      return array.$loaded();
    }

    me.add = function (item) {
      return array.$add(item);
    }

    me.save = function (item) {
      return array.$save(item);
    }

    me.delete = function (item) {
      return array.$remove(item);
    }
  };
}])

.service('Camera', ['$cordovaCamera', function($cordovaCamera) {
  var options = {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    allowEdit: true,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 100,
    targetHeight: 100,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false,
    correctOrientation:true
  };

  return {
    takePhoto: function () {
      return $cordovaCamera
        .getPicture(options)
        .then(function(imageData) {
          var image = document.getElementById('myImage');
          return "data:image/jpeg;base64," + imageData;
        });
    }
  };
}])

.service('Geolocation', ['$cordovaGeolocation', function($cordovaGeolocation) {
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  return {
    getLocation: function () {
      return $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          return {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
    }
  }
}]);
