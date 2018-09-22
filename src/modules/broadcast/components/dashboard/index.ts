import mod = require('modules/broadcast/module');
import 'leaflet-markercluster';
import 'rcss!../../../../../bower_components/leaflet.markercluster/dist/MarkerCluster.css';
import L = require('leaflet');

class Controller {
  static $inject = [
    '$scope',
    'leafletMapEvents',
    'leafletData',
    'modules/common/services/utility'
  ];
  constructor(
    private $scope,
    private leafletMapEvents,
    private leafletData,
    private utility: common.services.IUtility
  ) {
    $scope.vm = this;

    var icon: L.IconOptions = {
      iconUrl: 'images/gis/marker-icon.png',
      shadowUrl: 'images/gis/marker-shadow.png'
    };

    var iconbrok: L.IconOptions = {
      iconUrl: 'images/gis/marker-icon_alert.png',
      shadowUrl: 'images/gis/marker-shadow.png'
    };

    var mapEvents = leafletMapEvents.getAvailableMapEvents();

    var brokens = [];

    // var data = [
    //   {
    //     lat: 25.0391667,
    //     lng: 121.525,
    //     broken: true,
    //     icon: iconbrok
    //   },
    //   {
    //     lat: 24.9166667,
    //     lng: 121.1333333,
    //     broken: true,
    //     icon: iconbrok
    //   }
    // ];

    // 添加设备
    $scope.$on('leafletDirectiveMap.click', (event, e) => {
      $scope.clickCenter = e.leafletEvent.latlng;
      if (e.leafletEvent.originalEvent.ctrlKey) {
        var uid = utility.uuid().replace(/-/g, '');
        $scope.markers[uid] = {
          mid: uid,
          layer: this.$scope.currentArea.name,
          lat: e.leafletEvent.latlng.lat,
          lng: e.leafletEvent.latlng.lng,
          icon: icon
        };
      }
    });

    // 设置故障
    $scope.$on('leafletDirectiveMarker.click', (event, args) => {
      if ($.inArray(args.modelName, brokens) < 0) {
        brokens.push(args.modelName);
        args.model.icon = iconbrok;
      }
    });

    $scope.currentArea = null;

    $scope.mapDefaults = {
      attributionControl: false,
      zoomControl: true,
      minZoom: 7,
      maxZoom: 18,
      controls: {
        layers: {
          visible: false,
          position: 'topright',
          collapsed: true
        }
      }
    };

    $scope.center = {
      lng: 127.05,
      lat: 43.74,
      zoom: 7
    };

    $scope.clickCenter = {
      lat: 0,
      lng: 0
    };

    $scope.layers = {
      overlays: {
        // jilin: {
        //   name: 'jilinsheng',
        //   type: 'markercluster',
        //   layerOptions: {
        //     spiderfyOnMaxZoom: false,
        //     showCoverageOnHover: true,
        //     zoomToBoundsOnClick: false,
        //     iconCreateFunction: (cluster: L.MarkerCluster) => {
        //       var chMarkers = cluster.getAllChildMarkers();
        //       var brokenCount = 0;
        //       for (var m in chMarkers) {
        //         if ($.inArray(chMarkers[m].options['mid'], brokens) >= 0) {
        //           brokenCount++;
        //         }
        //       }
        //       var childCount = cluster.getChildCount();
        //       return new L.DivIcon({
        //         html:
        //           '<div><span>总数:' +
        //           childCount +
        //           '</span><br/><span>故障:' +
        //           brokenCount +
        //           '</span></div>',
        //         className:
        //           'marker-cluster marker-cluster-' +
        //           (brokenCount > 0 ? 'alert' : 'normal'),
        //         iconSize: new L.Point(60, 60)
        //       });
        //     }
        //   },
        //   visible: true
        // }
      }
    };

    // var group = {
    //   name: 'Group Layer',
    //   type: 'group',
    //   visible: true,
    //   layerOptions: {
    //     layers: [tileLayer, utfGrid],
    //     maxZoom: 5
    //   }
    // };

    $scope.markers = {};

    $scope.mapTiles = {
      url: 'http://webst03.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
    };

    $scope.areas = [
      {
        name: '吉林',
        pos: '125.342828,43.903823',
        zoom: 7,
        areas: [
          {
            name: '长春市',
            pos: '125.337237,43.890235',
            zoom: 12,
            areas: [
              {
                name: '南关区',
                pos: '125.350173,43.863989',
                zoom: 17
              },
              {
                name: '朝阳区',
                pos: '125.288319,43.863989',
                zoom: 17
              },
              {
                name: '绿园区',
                pos: '125.256136,43.863989',
                zoom: 17
              },
              {
                name: '二道区',
                pos: '125.374689,43.866571',
                zoom: 17
              },
              {
                name: '双阳区',
                pos: '125.664662,43.866571',
                zoom: 17
              },
              {
                name: '宽城区',
                pos: '125.326578,43.866571',
                zoom: 17
              },
              {
                name: '九台区',
                pos: '125.839574,43.866571',
                zoom: 17
              }
            ]
          },
          {
            name: '吉林市',
            pos: '126.55239,43.843804',
            zoom: 12,
            areas: [
              {
                name: '船营区',
                pos: '126.540966,43.833445',
                zoom: 17
              },
              {
                name: '龙潭区',
                pos: '126.562197,43.833445',
                zoom: 17
              },
              {
                name: '昌邑区',
                pos: '126.57471,43.833445',
                zoom: 17
              },
              {
                name: '丰满区',
                pos: '126.562274,43.833445',
                zoom: 17
              }
            ]
          },
          {
            name: '四平市',
            pos: '124.360894,43.176263',
            zoom: 12,
            areas: [
              {
                name: '铁西区',
                pos: '124.345722,43.146155',
                zoom: 17
              },
              {
                name: '铁东区',
                pos: '124.409622,43.146155',
                zoom: 17
              },
              {
                name: '双辽市',
                pos: '123.502724,43.146155',
                zoom: 17
              }
            ]
          }
        ]
      }
    ];

    this.addLayers($scope.areas);
  }

  private addLayers(layers) {
    if (!layers || !layers.length || layers.length <= 0) return;
    for (var i = 0; i < layers.length; i++) {
      this.$scope.layers.overlays[layers[i].name] = {
        name: layers[i].name,
        type: 'group',
        visible: false
      };
      this.addLayers(layers[i].areas);
    }
  }

  selectArea(area) {
    var pos = area.pos.split(',');

    for (var name in this.$scope.layers.overlays) {
      this.$scope.layers.overlays[name].visible = false;
    }

    this.$scope.layers.overlays[area.name].visible = true;

    this.$scope.currentArea = this.$scope.currentArea === area ? null : area;

    this.leafletData.getMap().then((map: L.Map) => {
      map.setView(
        {
          lat: pos[1],
          lng: pos[0]
        },
        area.zoom
      );
    });
  }
}

mod.controller('modules/broadcast/components/dashboard/index', Controller);
