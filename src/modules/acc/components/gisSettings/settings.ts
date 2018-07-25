import mod = require('modules/acc/module');
import angular = require('angular');
import { MapBuilder } from 'modules/acc/extend/leaflet/mapBuilder';

class Controller {
  private _map: L.Map;
  static $inject = [
    '$scope',
    '$element',
    '$rootScope',
    '$modal',
    'modules/common/services/requestService',
    'modules/common/factories/schemaFormParams'
  ];
  constructor(
    private $scope,
    private $element: JQLite,
    private $rootScope: ng.IRootScopeService,
    private $modal: ng.ui.bootstrap.IModalService,
    private requestService: common.services.IRequestService,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory
  ) {
    $scope.vm = this;
    $scope.categories = [];
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
                }
              }
            }),
            form: ['name'],
            model: {}
          }
        })
      })
      .result.then(data => {});
  }
}

mod.controller('modules/acc/components/gisSettings/settings', Controller);
