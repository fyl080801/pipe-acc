import mod = require('modules/acc/module');
import angular = require('angular');
import L = require('leaflet');
import { mapview, layerform } from 'modules/acc/components/gisSettings/forms';
import { MapBuilder } from 'modules/acc/extend/leaflet/mapBuilder';
import {
  EditorEvents,
  MapEvents
} from 'modules/acc/components/gisSettings/editorEvents';

interface Scope extends ng.IScope {
  [key: string]: any;
  editingLayer: acc.gis.model.IMapLayer;
}

class Controller {
  private _map: L.Map;
  private _editingLayer: L.LayerGroup<any>;

  private _addPointer(
    mapItem: acc.gis.model.IMapItem,
    layer: L.LayerGroup<any>
  ) {
    L.marker(mapItem.latlng, {
      draggable: true
    })
      .on('moveend ', evt => {
        mapItem.latlng = evt.target.getLatLng();
      })
      .addTo(layer);
  }

  static $inject = ['$scope', '$element'];
  constructor(private $scope: Scope, private $element: JQLite) {
    $scope.vm = this;

    $scope.map = new MapBuilder(
      $($element)
        .find('.map-area')
        .get(0)
    ).map();

    $scope.layers = {};

    $scope.editingLayer = null;

    this._map = $scope.map;

    $scope.$on(
      EditorEvents.ModelLoaded,
      (evt, model: acc.gis.model.ILocation) => {
        $scope.map.setView(
          [
            model.properties.mapview.centerLat,
            model.properties.mapview.centerLng
          ],
          model.properties.mapview.zoom
        );

        angular.forEach(model.properties.layers, (layer, idx) => {
          $scope.layers[layer.uuid] = L.layerGroup().addTo($scope.map);
          angular.forEach(layer.items, (item, idx) => {
            this._addPointer(item, $scope.layers[layer.uuid]);
          });
        });
      }
    );

    $scope.$on(EditorEvents.LayerAdded, (evt, layer) => {
      $scope.layers[layer.uuid] = L.layerGroup().addTo($scope.map);
    });

    $scope.$on(EditorEvents.LayerRemoved, (evt, layer) => {
      delete $scope.layers[layer.uuid];
    });

    $scope.$on(EditorEvents.LayerChanged, (evt, layer) => {
      this.$scope.editingLayer = layer;
      this._editingLayer = $scope.layers[layer.uuid];
    });

    $scope.$emit(MapEvents.MapReady, this._map);
  }

  addEquipment(data, e) {
    if (this._editingLayer) {
      var latlng = this._map.mouseEventToLatLng(e.event);
      var mapItem: acc.gis.model.IMapItem = {
        identity: data.id,
        latlng: { lat: latlng.lat, lng: latlng.lng },
        type: 'equipment'
      };

      this.$scope.editingLayer.items.push(mapItem);

      this._addPointer(mapItem, this._editingLayer);

      this.$scope.$emit(
        MapEvents.PointerAdded,
        mapItem,
        this.$scope.editingLayer
      );
    }
  }

  // 从contextMenu触发
  removeEquipment() {}
}

mod.controller('modules/acc/components/gisSettings/map', Controller);
