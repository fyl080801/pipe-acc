import mod = require('modules/acc/module');
import angular = require('angular');
import { mapview, infoform } from 'modules/acc/components/gisSettings/forms';
import { LayerEvents } from 'modules/acc/components/gisSettings/editorEvents';
import { LayerTypes } from 'modules/acc/components/gisSettings/builder/layerTypes';
import { LayerForms } from 'modules/acc/components/gisSettings/builder/layerForms';

class Controller {
  static $inject = [
    '$scope',
    '$modal',
    '$q',
    '$rootScope',
    'modules/common/factories/schemaFormParams',
    'modules/common/services/utility',
    'modules/common/services/schemaPopup',
    'app/services/popupService',
    'leafletData'
  ];
  constructor(
    private $scope: acc.gis.IMapScope,
    private $modal: ng.ui.bootstrap.IModalService,
    private $q: ng.IQService,
    private $rootScope: ng.IRootScopeService,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory,
    private utility: common.services.IUtility,
    private schemaPopup: common.services.ISchemaPopup,
    private popupService: app.services.IPopupService,
    private leafletData
  ) {
    $scope.vm = this;
    $scope.layerTypes = LayerTypes;
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
    this.leafletData.getMap().then((map: L.Map) => {
      map.setView(
        [
          this.$scope.model.properties.defaults.center.lat,
          this.$scope.model.properties.defaults.center.lng
        ],
        this.$scope.model.properties.defaults.center.zoom
      );
    });
  }

  setLatLng() {
    this.schemaPopup
      .confirm(
        $.extend(
          {
            title: '区域名称',
            model: $.extend({}, this.$scope.center)
          },
          mapview(this.schemaFormParams)
        ),
        {
          size: 'sm'
        }
      )
      .result.then(data => {
        this.$scope.model.properties = $.extend(
          true,
          this.$scope.model.properties,
          { defaults: { center: data } }
        );
      });
  }

  addLayer(layer) {
    this.schemaPopup
      .confirm(
        $.extend(
          {
            title: '添加' + LayerTypes[layer],
            model: {
              type: layer,
              visible: true,
              opacity: 1
            }
          },
          LayerForms[layer](this.schemaFormParams)
        )
      )
      .result.then(data => {
        this.$scope.model.properties.layers.overlays[
          this.utility.uuid()
        ] = data;
      });
  }

  removeLayer(layer) {
    var defer = this.$q.defer();

    defer.promise.then(() => {
      delete this.$scope.model.properties.layers.overlays[layer];
    });

    var layerMarkers = $.grep(
      this.$scope.model.properties.markers,
      (marker: any, key) => {
        return marker.layer === layer;
      }
    );

    if (layerMarkers.length > 0) {
      this.popupService.confirm('图层中有元素，是否删除？').ok(() => {
        defer.resolve();
      });
    } else {
      defer.resolve();
    }
  }

  toggleLayerShow(layer) {
    this.$scope.model.properties.layers.overlays[layer].visible = !this.$scope
      .model.properties.layers.overlays[layer].visible;
  }

  selectLayer(layer) {
    this.$scope.editingLayer = layer;
  }
}

mod.controller('modules/acc/components/gisSettings/layers', Controller);
