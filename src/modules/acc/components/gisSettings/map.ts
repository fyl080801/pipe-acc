import mod = require('modules/acc/module');
import angular = require('angular');
import { mapview } from 'modules/acc/components/gisSettings/forms';
import { MapBuilder } from 'modules/acc/extend/leaflet/mapBuilder';
import {
  EditorEvents,
  MapEvents
} from 'modules/acc/components/gisSettings/editorEvents';
import { LayerTypes } from 'modules/acc/components/gisSettings/builder/layerTypes';

interface Scope extends ng.IScope {
  [key: string]: any;
}

class Controller {
  static $inject = ['$scope', 'leafletData', 'modules/common/services/utility'];

  constructor(
    private $scope: Scope,
    private leafletData,
    private utility: common.services.IUtility
  ) {
    $scope.vm = this;
  }

  addElement(data, evt?) {
    // 回头加一个type，根据不同type实现添加不同要素的方法
    if (!this.$scope.editingLayer) {
      return;
    }

    if (
      this.$scope.model.properties.layers.overlays[this.$scope.editingLayer]
        .type !== LayerTypes.分组
    ) {
      return;
    }

    this.leafletData.getMap().then((map: L.Map) => {
      var latlng = map.mouseEventToLatLng(evt.event);
      this.$scope.model.properties.markers[data.id] = $.extend(
        {
          layer: this.$scope.editingLayer,
          draggable: true,
          icon: {
            type: 'dom',
            template:
              '<div class="pin-circle circle-danger"><div class="inner"></div><div>'
          }
          // icon: {
          //   iconUrl: 'images/acc/demo-icon.png',
          //   iconSize: [50, 69],
          //   iconAnchor: [25, 69]
          //   // popupAnchor: [1, -34],
          //   // shadowSize: [41, 41]
          // }
        },
        {
          lat: latlng.lat,
          lng: latlng.lng
        }
      );
    });
  }

  // // 从contextMenu触发
  // removeEquipment() {}
}

mod.controller('modules/acc/components/gisSettings/map', Controller);
