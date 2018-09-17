import mod = require('modules/broadcast/module');

class Controller {
  static $inject = ['$scope', 'leafletData'];
  constructor(private $scope, private leafletData) {
    $scope.vm = this;

    $scope.currentArea = null;

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
      },
      center: {
        lat: 0,
        lng: 0,
        zoom: 1
      }
    };

    $scope.markers = {};

    $scope.mapTiles = {
      url: 'http://webst03.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
    };

    $scope.areas = [
      {
        name: '北京市',
        children: [
          {
            name: '东城区',
            children: [
              {
                name: 'Grandchild 1',
                code: 'Grandchild1'
              },
              {
                name: 'Grandchild 2',
                code: 'Grandchild2'
              }
            ]
          },
          {
            name: 'Child 2',
            code: 'Child2'
          }
        ]
      },
      {
        name: '上海',
        children: [
          {
            name: 'Parent 3',
            code: 'Parent3'
          },
          {
            name: 'Parent 4',
            code: 'Parent4'
          },
          {
            name: 'Parent 5',
            code: 'Parent5'
          }
        ]
      }
    ];
  }

  selectArea(area) {
    this.$scope.currentArea = this.$scope.currentArea === area ? null : area;
  }

  setLocation(data, evt?) {
    this.leafletData.getMap().then((map: L.Map) => {
      var latlng = map.mouseEventToLatLng(evt.event);
      this.$scope.markers[data.code] = $.extend(
        {
          draggable: true,
          icon: {
            iconUrl: 'images/acc/demo-icon.png',
            iconSize: [50, 69],
            iconAnchor: [25, 69]
          }
        },
        {
          lat: latlng.lat,
          lng: latlng.lng
        }
      );
    });
  }
}

mod.controller('modules/broadcast/components/terminal/location', Controller);
