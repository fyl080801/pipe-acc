import mod = require('modules/acc/module');
import angular = require('angular');
import { mapview, layerform } from 'modules/acc/components/gisSettings/forms';
import { DefaultFormTypes } from 'modules/common/configs/enums/defaultFormTypes';

class Controller {
  static $inject = [
    '$scope',
    '$modal',
    '$q',
    '$rootScope',
    'modules/common/factories/schemaFormParams',
    'app/services/popupService'
  ];
  constructor(
    private $scope: acc.gis.IMapScope,
    private $modal: ng.ui.bootstrap.IModalService,
    private $q: ng.IQService,
    private $rootScope: ng.IRootScopeService,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;
    $scope.editingLayer = null;
  }

  setInfo() {
    this.$modal
      .open({
        templateUrl: 'modules/common/templates/schemaConfirm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: {
            title: '区域名称',
            formParams: this.schemaFormParams({
              properties: {
                name: {
                  title: '名称',
                  type: 'string',
                  required: true
                },
                description: {
                  title: '说明',
                  type: 'string'
                }
              }
            }),
            form: [
              'name',
              {
                key: 'description',
                type: DefaultFormTypes.textarea
              }
            ],
            model: {
              name: this.$scope.model.name,
              description: this.$scope.model.description
            }
          }
        })
      })
      .result.then(data => {
        this.$scope.model.name = data.name;
        this.$scope.model.description = data.description;
      });
  }

  goLatLng() {
    this.$scope.map.setView(
      [
        this.$scope.model.properties.mapview.centerLat,
        this.$scope.model.properties.mapview.centerLng
      ],
      this.$scope.model.properties.mapview.zoom
    );
  }

  setLatLng() {
    this.$modal
      .open({
        templateUrl: 'modules/common/templates/schemaConfirm.html',
        size: 'sm',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: angular.extend(
            {
              title: '区域名称',
              model: {
                centerLng: this.$scope.map.getCenter().lng,
                centerLat: this.$scope.map.getCenter().lat,
                zoom: this.$scope.map.getZoom()
              }
            },
            mapview(this.schemaFormParams)
          )
        })
      })
      .result.then(data => {
        this.$scope.model.properties.mapview = data;
      });
  }

  addLayer() {
    this.$scope.model.properties.layers =
      this.$scope.model.properties.layers || [];
    var idx = this.$scope.model.properties.layers.length + 1;
    this.$scope.model.properties.layers.push({
      items: [],
      name: '新图层 ' + idx,
      zIndex: idx
    });
  }

  removeLayer(idx) {
    var defer = this.$q.defer();
    defer.promise.then(() => {
      this.$scope.model.properties.layers.splice(idx, 1);
    });

    if (this.$scope.model.properties.layers[idx].items.length > 0) {
      this.popupService.confirm('图层中有元素，是否删除？').ok(() => {
        defer.resolve();
      });
    } else {
      defer.resolve();
    }
  }

  selectLayer(lay) {
    this.$scope.editingLayer = lay;
  }
}

mod.controller('modules/acc/components/gisSettings/layers', Controller);
