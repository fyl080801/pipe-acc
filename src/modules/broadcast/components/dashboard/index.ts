import mod = require('modules/broadcast/module');
import 'leaflet-markercluster';
import 'rcss!../../../../../bower_components/leaflet.markercluster/dist/MarkerCluster.css';
import L = require('leaflet');

class Controller {
  static $inject = ['$scope', 'leafletMapEvents', 'leafletData'];
  constructor(private $scope, private leafletMapEvents, private leafletData) {
    $scope.vm = this;

    var icon: L.IconOptions = {
      iconUrl: 'images/gis/marker-icon.png',
      shadowUrl: 'images/gis/marker-shadow.png'
    };

    var iconbrok: L.IconOptions = {
      iconUrl: 'images/gis/marker-icon_alert.png',
      shadowUrl: 'images/gis/marker-shadow.png'
    };

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

    var brokens = [];

    $scope.layers = {
      overlays: {
        taiwan: {
          name: 'South cities',
          type: 'markercluster',
          layerOptions: {
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: true,
            zoomToBoundsOnClick: false,
            iconCreateFunction: (cluster: L.MarkerCluster) => {
              var chMarkers = cluster.getAllChildMarkers();
              var brokenCount = 0;
              for (var m in chMarkers) {
                if (chMarkers[m].options['broken'] === true) {
                  brokenCount++;
                }
              }
              var childCount = cluster.getChildCount();

              return new L.DivIcon({
                html:
                  '<div><span>总数:' +
                  childCount +
                  '</span><br/><span>故障:' +
                  brokenCount +
                  '</span></div>',
                className:
                  'marker-cluster marker-cluster-' +
                  (brokenCount > 0 ? 'alert' : 'normal'),
                iconSize: new L.Point(50, 50)
              });
            }
          },
          visible: true
        }
      }
    };

    $scope.markers = {
      taipei: {
        layer: 'taiwan',
        lat: 25.0391667,
        lng: 121.525,
        broken: true,
        icon: iconbrok
      },
      yangmei: {
        layer: 'taiwan',
        lat: 24.9166667,
        lng: 121.1333333,
        broken: true,
        icon: iconbrok
      },
      hsinchu: {
        layer: 'taiwan',
        lat: 24.8047222,
        lng: 120.9713889,
        icon: icon
      },
      miaoli: {
        layer: 'taiwan',
        lat: 24.5588889,
        lng: 120.8219444,
        icon: icon
      },
      tainan: {
        layer: 'taiwan',
        lat: 22.9933333,
        lng: 120.2036111,
        icon: icon
      },
      puzi: {
        layer: 'taiwan',
        lat: 23.4611,
        lng: 120.242,
        icon: icon
      },
      kaohsiung: {
        layer: 'taiwan',
        lat: 22.6252777778,
        lng: 120.3088888889,
        icon: icon
      },
      taitun: {
        layer: 'taiwan',
        lat: 22.75,
        lng: 121.15,
        icon: icon
      }
    };

    $scope.mapTiles = {
      url: 'http://webst03.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
    };
  }
}

mod.controller('modules/broadcast/components/dashboard/index', Controller);
