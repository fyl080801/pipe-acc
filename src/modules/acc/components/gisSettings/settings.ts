import mod = require('modules/acc/module');
import angular = require('angular');
import L = require('leaflet');
import { MapBuilder } from 'modules/acc/extend/leaflet/mapBuilder';
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';
import { DefaultFormTypes } from 'modules/common/configs/enums/defaultFormTypes';

class Controller {
  private _map: L.Map;
  static $inject = [
    '$scope',
    '$stateParams',
    '$element',
    '$rootScope',
    '$modal',
    'modules/common/services/requestService',
    'modules/common/factories/schemaFormParams',
    'modules/common/factories/ngTableRequest',
    'app/services/popupService',
    'app/services/treeUtility'
  ];
  constructor(
    private $scope,
    private $stateParams: ng.ui.IStateParamsService,
    private $element: JQLite,
    private $rootScope: ng.IRootScopeService,
    private $modal: ng.ui.bootstrap.IModalService,
    private requestService: common.services.IRequestService,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory,
    private ngTableRequest: common.factories.INgTableRequestFactory,
    private popupService: app.services.IPopupService,
    private treeUtility: app.services.ITreeUtility
  ) {
    $scope.vm = this;
    $scope.location = {};
    $scope.map = new MapBuilder(
      $($element)
        .find('.map-area')
        .get(0)
    ).map();

    this._map = $scope.map;

    // $scope.categories = [];
    // $scope.areas = [];
    // $scope.current = null;
    // $scope.equipments = [];
    // $scope.categoryText = null;
    // $scope.categoryCode = null;

    // $scope.currentlayers = L.layerGroup().addTo($scope.map);
    // $scope.categoryTable = ngTableRequest({
    //   url: '/api/acc/equipment/query',
    //   showLoading: false,
    //   data: {
    //     categoryCode: $scope.categoryCode
    //   }
    // }).table();
    //
    // requestService
    //   .url('/api/acc/equipment/category')
    //   .options({
    //     showLoading: false
    //   })
    //   .get()
    //   .result.then((result: any) => {
    //     treeUtility
    //       .resolveTree({
    //         children:
    //           result && result.children && result.children.length > 0
    //             ? result.children
    //             : []
    //       })
    //       .key('code')
    //       .childrenKey('children')
    //       .result.then(tree => {
    //         $scope.categories = tree.$children;
    //       });
    //   });
  }

  loadLocation() {
    this.requestService
      .url('/api/acc/location/' + this.$stateParams.id)
      .get()
      .result.then(result => {
        this.$scope.location = result;
      });
  }

  saveLocation() {
    this.requestService
      .url('/api/acc/location')
      .put(this.$scope.location)
      .result.then(result => {});
  }

  setLatLng() {
    this.$modal
      .open({
        templateUrl: 'modules/common/templates/schemaConfirm.html',
        size: 'sm',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: {
            title: '区域名称',
            formParams: this.schemaFormParams({
              properties: {
                centerLng: {
                  title: '中心经度',
                  type: 'number'
                },
                centerLat: {
                  title: '中心纬度',
                  type: 'number'
                },
                zoom: {
                  title: '缩放等级',
                  type: 'number'
                }
              }
            }),
            form: [
              {
                key: 'centerLng'
              },
              {
                key: 'centerLat'
              },
              {
                key: 'zoom'
              }
            ],
            model: {
              centerLng: this._map.getCenter().lng,
              centerLat: this._map.getCenter().lat,
              zoom: this._map.getZoom()
            }
          }
        })
      })
      .result.then(data => {
        this.$scope.location.properties.mapview = data;
        // this.requestService
        //   .url('/api/acc/location/areas')
        //   .post({
        //     code: '',
        //     name: data.name,
        //     centerLng: data.centerLng,
        //     centerLat: data.centerLat,
        //     zoom: data.zoom
        //   })
        //   .result.then(result => {
        //     this.requestService
        //       .url('/api/acc/location/areas')
        //       .options({
        //         showLoading: false
        //       })
        //       .get()
        //       .result.then(result => {
        //         this.$scope.areas = result;
        //       });
        //   });
      });
  }

  // loadAreas() {
  //   this.requestService
  //     .url('/api/acc/location/areas')
  //     .options({
  //       showLoading: false
  //     })
  //     .get()
  //     .result.then(result => {
  //       this.$scope.areas = result;
  //     });
  // }

  // loadEquipments() {
  //   this.requestService
  //     .url('/api/acc/equipment/category/' + this.$scope.categoryCode)
  //     .options({
  //       showLoading: false
  //     })
  //     .get()
  //     .result.then(result => {
  //       this.$scope.equipments = result;
  //     });
  // }

  // selectCategory(cate: app.services.ITreeItem<any>) {
  //   this.$scope.categoryName = cate.$data.name;
  //   var findParent = (c: app.services.ITreeItem<any>) => {
  //     this.$scope.categoryName =
  //       c.$data.name + ' / ' + this.$scope.categoryName;
  //     if (c.$parent && c.$parent.$parent) {
  //       findParent(c.$parent);
  //     }
  //   };
  //   findParent(cate.$parent);
  //   this.$scope.categoryCode = cate.$data.code;
  //   this.loadEquipments();
  // }

  // saveLocation() {

  // }

  // changeLocation(area) {
  //   this._map.setView(
  //     {
  //       lat: area.centerLat,
  //       lng: area.centerLng
  //     },
  //     area.zoom,
  //     {
  //       animate: true
  //     }
  //   );
  //   this.$scope.current = area;
  // }

  // updateArea(area) {
  //   this.popupService.confirm('是否用新位置和缩放替换原有？').ok(() => {
  //     area.centerLng = this._map.getCenter().lng;
  //     area.centerLat = this._map.getCenter().lat;
  //     area.zoom = this._map.getZoom();
  //     this.requestService.url('/api/acc/location/areas').post(area);
  //   });
  // }

  // renameArea(area) {
  //   this.$modal
  //     .open({
  //       templateUrl: 'modules/common/templates/schemaConfirm.html',
  //       size: 'sm',
  //       scope: angular.extend(this.$rootScope.$new(), {
  //         $data: {
  //           title: '重命名',
  //           formParams: this.schemaFormParams({
  //             properties: {
  //               name: {
  //                 title: '区域名称',
  //                 type: 'string',
  //                 required: true
  //               }
  //             }
  //           }),
  //           form: ['name'],
  //           model: {
  //             name: area.name
  //           }
  //         }
  //       })
  //     })
  //     .result.then(data => {
  //       area.name = data.name;
  //       this.requestService.url('/api/acc/location/areas').post(area);
  //     });
  // }

  // deleteArea(area) {
  //   this.popupService.confirm('是否删除？').ok(() => {
  //     this.requestService
  //       .url('/api/acc/location/areas/' + area.code)
  //       .drop()
  //       .result.then(() => {
  //         this.loadAreas();
  //       });
  //   });
  // }

  // addEquipment(data, e) {
  //   L.marker(this._map.mouseEventToLatLng(e.event), {
  //     draggable: true
  //   }).addTo(this.$scope.currentlayers);
  // }
}

mod.controller('modules/acc/components/gisSettings/settings', Controller);
