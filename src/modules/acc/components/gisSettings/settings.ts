import mod = require('modules/acc/module');
import angular = require('angular');
import { MapBuilder } from 'modules/acc/extend/leaflet/mapBuilder';
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';
import { DefaultFormTypes } from 'modules/common/configs/enums/defaultFormTypes';

class Controller {
  private _map: L.Map;
  static $inject = [
    '$scope',
    '$element',
    '$rootScope',
    '$modal',
    'modules/common/services/requestService',
    'modules/common/factories/schemaFormParams',
    'app/services/popupService'
  ];
  constructor(
    private $scope,
    private $element: JQLite,
    private $rootScope: ng.IRootScopeService,
    private $modal: ng.ui.bootstrap.IModalService,
    private requestService: common.services.IRequestService,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;
    $scope.categories = [];
    $scope.areas = [];
    $scope.current = null;
    $scope.map = new MapBuilder(
      $($element)
        .find('.map-area')
        .get(0)
    ).map();

    this._map = $scope.map;

    requestService
      .url('/api/acc/equipment/category')
      .options({
        showLoading: false
      })
      .get()
      .result.then((result: any) => {
        $scope.categories =
          result && result.children && result.children.length > 0
            ? result.children
            : [];
      });
  }

  loadAreas() {
    this.requestService
      .url('/api/acc/location/areas')
      .options({
        showLoading: false
      })
      .get()
      .result.then(result => {
        this.$scope.areas = result;
      });
  }

  nodeToggle(scope) {
    scope.toggle();
  }

  saveLocation() {
    this.$modal
      .open({
        templateUrl: 'modules/common/templates/schemaConfirm.html',
        size: 'sm',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: {
            title: '区域名称',
            formParams: this.schemaFormParams({
              properties: {
                name: {
                  title: '区域名称',
                  type: 'string',
                  required: true
                },
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
              'name',
              {
                key: 'centerLng',
                type: ExtendFormFields.display
              },
              {
                key: 'centerLat',
                type: ExtendFormFields.display
              },
              {
                key: 'zoom',
                type: ExtendFormFields.display
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
        this.requestService
          .url('/api/acc/location/areas')
          .post({
            code: '',
            name: data.name,
            centerLng: data.centerLng,
            centerLat: data.centerLat,
            zoom: data.zoom
          })
          .result.then(result => {
            this.requestService
              .url('/api/acc/location/areas')
              .options({
                showLoading: false
              })
              .get()
              .result.then(result => {
                this.$scope.areas = result;
              });
          });
      });
  }

  changeLocation(area) {
    this._map.setView(
      {
        lat: area.centerLat,
        lng: area.centerLng
      },
      area.zoom,
      {
        animate: true
      }
    );
    this.$scope.current = area;
  }

  updateArea(area) {
    this.popupService.confirm('是否用新位置和缩放替换原有？').ok(() => {
      area.centerLng = this._map.getCenter().lng;
      area.centerLat = this._map.getCenter().lat;
      area.zoom = this._map.getZoom();
      this.requestService.url('/api/acc/location/areas').post(area);
    });
  }

  renameArea(area) {
    this.$modal
      .open({
        templateUrl: 'modules/common/templates/schemaConfirm.html',
        size: 'sm',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: {
            title: '重命名',
            formParams: this.schemaFormParams({
              properties: {
                name: {
                  title: '区域名称',
                  type: 'string',
                  required: true
                }
              }
            }),
            form: ['name'],
            model: {
              name: area.name
            }
          }
        })
      })
      .result.then(data => {
        area.name = data.name;
        this.requestService.url('/api/acc/location/areas').post(area);
      });
  }
}

mod.controller('modules/acc/components/gisSettings/settings', Controller);
