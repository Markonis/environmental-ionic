angular.module('app.directives', [])

.directive('onlyLoggedIn', ['FirebaseSession', function(FirebaseSession){
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      scope.firebaseUtil = FirebaseSession;
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

.directive('onlyLoggedOut', ['FirebaseSession', function(FirebaseSession){
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      scope.firebaseUtil = FirebaseSession;
      scope.$watch('firebaseUtil.isLoggedIn', function(value) {
        if(value){
          element.addClass('hidden');
        }else{
          element.removeClass('hidden');
        }
      });
    }
  };
}])

.directive('googleMap', ['Geolocation', function (Geolocation) {
  return {
    restrict: 'E',
    template: '<div class="full-width full-height"></div>',
    replace: true,
    scope: {
      markers: "="
    },
    link: function(scope, element, attrs) {
      // Setup
      var map = null;
      function setupMap() {
        Geolocation.getLocation().then(function (location) {
          map = new google.maps.Map(element[0], {
            center: location,
            zoom: 16
          });
          refreshMarkers(scope.markers);
        });
      }

      var interval = window.setInterval(function () {
        if(window.mapsApiInitialized){
          window.clearInterval(interval);
          setupMap();
        }
      }, 500);

      // Markers
      var markers = [];

      function clearMarkers() {
        for(var i = 0; i < markers.length; i++){
          markers[i].setMap(null);
        }
        markers = [];
      }

      function createMarker(item) {
        return new google.maps.Marker({
          position: item.location,
          map: map
        });
      }

      function refreshMarkers(array) {
        if(map && array) {
          // Clear markers
          clearMarkers();
          for(var i = 0; i < array.length; i++){
            var marker = createMarker(array[i], map);
            markers.push(marker);
          }
        }
      }

      scope.$watch('markers', function (array) {
        refreshMarkers(array);
      });
    }
  }
}])

.directive('canvasImage', function () {
  return {
    restrict: 'E',
    template: '<canvas class="full-width full-height"></canvas>',
    replace: true,
    scope: {
      url: "@"
    },
    link: function(scope, element, attrs) {
      var c = element[0];
      var ctx = c.getContext("2d");

      function drawImage(url) {
        var img = new Image();
        img.onload = function () {
          c.width = img.width;
          c.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
        }
        img.src = url;
      }

      scope.$watch('url', function (value) {
        if(value) drawImage(value);
      })
    }
  }
})
;

