import mod = require('modules/broadcast/module');

class Controller {
  static $inject = ['$scope', 'leafletMapEvents', 'leafletData'];
  constructor(private $scope, private leafletMapEvents, private leafletData) {
    $scope.vm = this;

    $scope.mapDefaults = {
      attributionControl: false,
      zoomControl: true,
      maxZoom: 20,
      controls: {
        layers: {
          visible: false,
          position: 'topright',
          collapsed: true
        }
      }
    };

    $scope.markers = {};

    $scope.mapTiles = {
      url: 'http://webst03.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
    };

    var mapEvents = leafletMapEvents.getAvailableMapEvents();

    $scope.$on('leafletDirectiveMap.click', (event, e) => {
      var latlng = e.leafletEvent.latlng;
      $scope.$data.model.pos = latlng.lng + ',' + latlng.lat;
    });
  }

  initModalMap() {
    this.leafletData.getMap().then((map: L.Map) => {
      setTimeout(() => {
        map.invalidateSize();
      }, 10);
    });
  }
}

mod.controller('modules/broadcast/components/terminal/deviceForm', Controller);
