import mod = require('modules/broadcast/module');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {
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
      },
      center: {
        lat: 0,
        lng: 0,
        zoom: 1
      }
    };

    $scope.mapTiles = {
      url: 'http://webst03.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
    };

    $scope.areas = [
      {
        text: 'Parent 1',
        nodes: [
          {
            text: 'Child 1',
            nodes: [
              {
                text: 'Grandchild 1'
              },
              {
                text: 'Grandchild 2'
              }
            ]
          },
          {
            text: 'Child 2'
          }
        ]
      },
      {
        text: 'Parent 2'
      },
      {
        text: 'Parent 3'
      },
      {
        text: 'Parent 4'
      },
      {
        text: 'Parent 5'
      }
    ];
  }
}

mod.controller('modules/broadcast/components/terminal/location', Controller);
