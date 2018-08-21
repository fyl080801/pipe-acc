import mod = require('modules/acc/module');
import angular = require('angular');
import { mapview, infoform } from 'modules/acc/components/gisSettings/forms';
import { LayerEvents } from 'modules/acc/components/gisSettings/editorEvents';

class Controller {
  static $inject = [
    '$scope',
    '$modal',
    '$q',
    '$rootScope',
    'modules/common/factories/schemaFormParams',
    'modules/common/services/utility',
    'modules/common/services/schemaPopup',
    'app/services/popupService'
  ];
  constructor(
    private $scope: acc.gis.IMapScope,
    private $modal: ng.ui.bootstrap.IModalService,
    private $q: ng.IQService,
    private $rootScope: ng.IRootScopeService,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory,
    private utility: common.services.IUtility,
    private schemaPopup: common.services.ISchemaPopup,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;
    $scope.editingLayer = null;

    $scope.$emit(LayerEvents.LayerInit, this);
  }

  setInfo() {
    this.schemaPopup
      .confirm(
        $.extend(
          {
            title: '区域名称',
            model: {
              name: this.$scope.model.name,
              description: this.$scope.model.description
            }
          },
          infoform(this.schemaFormParams)
        )
      )
      .result.then(data => {
        this.$scope.model.name = data.name;
        this.$scope.model.description = data.description;
      });
  }

  goLatLng() {
    if (!this.$scope.map) {
      this.popupService.information('地图未初始化');
      return;
    }

    this.$scope.map.setView(
      [
        this.$scope.model.properties.mapview.centerLat,
        this.$scope.model.properties.mapview.centerLng
      ],
      this.$scope.model.properties.mapview.zoom
    );
  }

  setLatLng() {
    if (!this.$scope.map) {
      this.popupService.information('地图未初始化');
      return;
    }

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

  // addLayer() {
  //   this.$scope.model.properties.layers =
  //     this.$scope.model.properties.layers || [];
  //   var idx = this.$scope.model.properties.layers.length + 1;
  //   var layer = {
  //     items: [],
  //     name: '新图层 ' + idx,
  //     uuid: this.utility.uuid()
  //   };
  //   this.$scope.model.properties.layers.push(layer);
  //   this.$scope.$emit(LayerEvents.LayerAdded, layer);

  //   if (this.$scope.model.properties.layers.length === 1) {
  //     this.selectLayer(this.$scope.model.properties.layers[0]);
  //   }
  // }

  // removeLayer(idx) {
  //   var defer = this.$q.defer();
  //   defer.promise.then(() => {
  //     this.$scope.$emit(
  //       LayerEvents.LayerRemoved,
  //       this.$scope.model.properties.layers.splice(idx, 1)[0]
  //     );
  //   });

  //   if (this.$scope.model.properties.layers[idx].items.length > 0) {
  //     this.popupService.confirm('图层中有元素，是否删除？').ok(() => {
  //       defer.resolve();
  //     });
  //   } else {
  //     defer.resolve();
  //   }
  // }

  selectLayer(lay) {
    this.$scope.editingLayer = lay;
    this.$scope.$emit(LayerEvents.LayerChanged, lay);
  }
}

mod.controller('modules/acc/components/gisSettings/layers', Controller);
