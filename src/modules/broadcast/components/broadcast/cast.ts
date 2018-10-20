import mod = require('modules/broadcast/module');
import L = require('leaflet');
import angular = require('angular');
import { DefaultIcon } from '../dashboard/icon';

class Controller {
  static $inject = [
    '$scope',
    'leafletMapEvents',
    'leafletData',
    'modules/common/services/utility',
    'modules/common/services/requestService',
    'app/services/treeUtility',
    'axPhone'
  ];
  constructor(
    private $scope,
    private leafletMapEvents,
    private leafletData,
    private utility: common.services.IUtility,
    private requestService: common.services.IRequestService,
    private treeUtility: app.services.ITreeUtility,
    private axPhone: broadcast.IAxPhoneFactory
  ) {
    $scope.vm = this;

    var brokens = [];

    $scope.areas = [];
    $scope.devices = [];
    $scope.selectedArea = [];
    $scope.playing = [];

    $scope.mapDefaults = {
      attributionControl: false,
      zoomControl: true,
      minZoom: 1, //7,
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

    $scope.layers = {
      overlays: {
        markersLayer: {
          name: 'markersLayer',
          type: 'markercluster',
          layerOptions: {
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: true,
            zoomToBoundsOnClick: false,
            iconCreateFunction: (cluster: L.MarkerCluster) => {
              var chMarkers = cluster.getAllChildMarkers();
              var brokenCount = 0;
              // for (var m in chMarkers) {
              //   if ($.inArray(chMarkers[m].options['mid'], brokens) >= 0) {
              //     brokenCount++;
              //   }
              // }
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
                iconSize: new L.Point(60, 60)
              });
            }
          },
          visible: true
        }
      }
    };

    $scope.markers = {};

    $scope.mapTiles = {
      url: 'http://webst03.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}'
    };
  }

  /**
   * 读取根区域
   */
  loadRoot() {
    this.requestService
      .url('/api/node?parentId=0')
      .options({ showLoading: false })
      .get()
      .result.then((result: any[]) => {
        this.treeUtility
          .toTree(result)
          .parentKey('parentId')
          .key('id')
          .result.then(tree => {
            this.$scope.areas = tree.$children;
          });

        var firstNode = result.length > 0 ? result[0] : null;
        if (firstNode && firstNode.pos) {
          var firstPos = firstNode.pos.split(',');
          if (firstPos.length === 2) {
            this.$scope.center = $.extend(this.$scope.center, {
              lat: parseFloat(firstPos[1]),
              lng: parseFloat(firstPos[0])
            });
          }
        }
      });
  }

  /**
   * 读取设备
   * @param parentId
   */
  loadDevices(parentId: number) {
    this.requestService
      .url('/api/node?parentId=' + parentId)
      .options({ showLoading: false })
      .get()
      .result.then((result: any[]) => {
        if (result && result.length > 0) {
          angular.forEach(result, (item, idx) => {
            this.loadDevices(item.id);
          });
        }
      });

    if (parentId > 0) {
      this.requestService
        .url('/api/device/?parentId=' + parentId)
        .options({ showLoading: false })
        .get()
        .result.then((result: any[]) => {
          angular.forEach(result, (item, idx) => {
            if (item.pos) {
              var posArray = item.pos.split(',');
              if (posArray.length === 2) {
                this.$scope.markers[item.id] = {
                  //mid: item.id,
                  layer: 'markersLayer',
                  lat: parseFloat(posArray[1]),
                  lng: parseFloat(posArray[0]),
                  icon: DefaultIcon
                };
              }
            }
          });
        });
    }
  }

  /**
   * 展开/收缩区域
   * @param scope
   * @param $event
   */
  toggleArea(scope, $event) {
    scope.toggle();

    if (!scope.collapsed) {
      this.requestService
        .url('/api/node?parentId=' + scope.area.$key)
        .options({ showLoading: false })
        .get()
        .result.then((result: any[]) => {
          if (result && result.length > 0) {
            this.treeUtility
              .toTree(result)
              .key('id')
              .parentKey('parentId')
              .onEach((item: any) => {
                item.$parent = scope.area;
              })
              .result.then(areas => {
                scope.area.$children = areas.$children;
              });
          }
        });
    }

    $event.stopPropagation();
  }

  /**
   * 选择区域
   * @param scope
   */
  checkArea(scope) {
    var idx = $.inArray(scope.area.$key, this.$scope.selectedArea);
    if (idx >= 0) {
      this.$scope.selectedArea.splice(idx, 1);
    } else {
      this.$scope.selectedArea.push(scope.area.$key);
    }
  }

  isChecked(scope) {
    return $.inArray(scope.area.$key, this.$scope.selectedArea) >= 0;
  }

  /**
   * 播放
   */
  play() {
    this.treeUtility
      .eachTree({
        $data: {},
        $parent: null,
        $children: this.$scope.areas,
        $key: null
      })
      .onEach(item => {})
      .result.then(() => {
        this.axPhone().Play([]);
      });
  }

  /**
   * 停止
   */
  stop() {
    this.axPhone().Stop([]);
  }

  /**
   * 定位到坐标
   * @param scope
   */
  toArea(scope) {
    if (scope.area.$data.pos) {
      var areaPos = scope.area.$data.pos.split(',');
      if (areaPos.length === 2) {
        this.$scope.center = $.extend(this.$scope.center, {
          lat: parseFloat(areaPos[1]),
          lng: parseFloat(areaPos[0]),
          zoom: scope.area.$data.zoom
        });
      }
    }
  }

  private childrenCheck(area: app.services.ITreeItem<any>) {
    if (!area.$children) return;
    for (var i = 0; i < area.$children.length; i++) {
      this.checkArea({ area: area.$children[i] });
      this.childrenCheck(area.$children[i]);
    }
  }
}

mod.controller('modules/broadcast/components/broadcast/cast', Controller);
