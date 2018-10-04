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
      url: 'static/map/{z}/{x}/{y}.png'//'http://webst03.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
    };

    var mapEvents = leafletMapEvents.getAvailableMapEvents();

    $scope.$on('leafletDirectiveMap.click', (event, e) => {
      var latlng = e.leafletEvent.latlng;
      $scope.$data.model.pos = latlng.lng + ',' + latlng.lat;
    });
  }

  initModalMap() {
    var pos =
      this.$scope.$data.model.pos && this.$scope.$data.model.pos.length > 0
        ? this.$scope.$data.model.pos.split(',')
        : [0, 0];

    pos = pos.length === 2 ? pos : [0, 0];

    var zoom = this.$scope.$data.model.zoom ? this.$scope.$data.model.zoom : 7;

    this.leafletData.getMap().then((map: L.Map) => {
      setTimeout(() => {
        map.invalidateSize();
        map.setView({ lat: parseInt(pos[1]), lng: parseInt(pos[0]) }, zoom);
      }, 10);
    });
  }
}

mod.controller('modules/broadcast/components/terminal/deviceForm', Controller);
