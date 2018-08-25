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
  // private _map: L.Map;
  // private _editingLayer: L.LayerGroup<any>;
  // private _reayToAdd: any;

  // private _addPointer(
  //   mapItem: acc.gis.model.IMapItem,
  //   layer: L.LayerGroup<any>
  // ) {
  //   return L.marker(mapItem.latlng, {
  //     draggable: true
  //   })
  //     .on('moveend ', evt => {
  //       mapItem.latlng = evt.target.getLatLng();
  //     })
  //     .addTo(layer);
  // }

  static $inject = ['$scope', 'leafletData', 'modules/common/services/utility'];
  constructor(
    private $scope: Scope,
    private leafletData,
    private utility: common.services.IUtility
  ) {
    $scope.vm = this;

    // $scope.map = new MapBuilder(
    //   $($element)
    //     .find('.map-area')
    //     .get(0),
    //   { maxZoom: 18 }
    // ).map();

    // angular.extend($scope, {
    //   layers: {
    //     baselayers: {
    //       xyz: {
    //         name: 'OpenStreetMap (XYZ)',
    //         url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //         type: 'xyz'
    //       }
    //     },
    //     overlays: {}
    //   }
    // });

    //$scope.editingLayer = null;

    //this._map = $scope.map;

    // // 完成数据加载
    // $scope.$on(
    //   EditorEvents.ModelLoaded,
    //   (evt, model: acc.gis.model.ILocation) => {}
    // );

    // $scope.$on(EditorEvents.LayerAdded, (evt, layer) => {
    //   $scope.layers[layer.uuid] = L.layerGroup().addTo($scope.map);
    // });

    // $scope.$on(EditorEvents.LayerRemoved, (evt, layer) => {
    //   $scope.layers[layer.uuid].remove();
    //   delete $scope.layers[layer.uuid];
    // });

    // $scope.$on(EditorEvents.LayerChanged, (evt, layer) => {
    //   this.$scope.editingLayer = layer;
    //   this._editingLayer = $scope.layers[layer.uuid];

    //   if (this._reayToAdd) {
    //     this.addEquipment(this._reayToAdd);
    //     this._reayToAdd = null;
    //   }
    // });

    // $scope.$emit(MapEvents.MapInit, this);
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
            iconUrl: 'images/acc/demo-icon.png',
            iconSize: [50, 69],
            iconAnchor: [25, 69]
            // popupAnchor: [1, -34],
            // shadowSize: [41, 41]
          }
        },
        {
          lat: latlng.lat,
          lng: latlng.lng
        }
      );
    });
  }

  // getMap() {
  //   return this._map;
  // }

  // addEquipment(data, e?) {
  //   let mapItem: acc.gis.model.IMapItem;
  //   if (e) {
  //     var latlng = this._map.mouseEventToLatLng(e.event);
  //     mapItem = {
  //       identity: data.id,
  //       latlng: { lat: latlng.lat, lng: latlng.lng },
  //       type: 'equipment'
  //     };
  //   } else {
  //     mapItem = data;
  //   }

  //   if (!this._editingLayer) {
  //     this._reayToAdd = mapItem;
  //     this.$scope.$emit(MapEvents.NoLayer);
  //     return;
  //   }

  //   //this.$scope.editingLayer.items.push(mapItem);

  //   this._addPointer(mapItem, this._editingLayer);

  //   this.$scope.$emit(
  //     MapEvents.PointerAdded,
  //     mapItem,
  //     this.$scope.editingLayer
  //   );
  // }

  // // 从contextMenu触发
  // removeEquipment() {}
}

mod.controller('modules/acc/components/gisSettings/map', Controller);
