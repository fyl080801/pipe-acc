import mod = require('modules/acc/module');
import angular = require('angular');
import L = require('leaflet');
import { MapBuilder } from 'modules/acc/extend/leaflet/mapBuilder';
import { ToolsEvents } from 'modules/acc/components/gis/indexEvents';

interface Scope extends ng.IScope {
  [key: string]: any;
}

class Controller {
  private _map: L.Map;
  private _layers: L.LayerGroup<any>[];

  private _addPointer(
    mapItem: acc.gis.model.IMapItem,
    layer: L.LayerGroup<any>
  ) {
    L.marker(mapItem.latlng, {}).addTo(layer);
  }

  static $inject = [
    '$scope',
    '$element',
    'modules/acc/factories/mapControl',
    'modules/common/services/requestService'
  ];
  constructor(
    private $scope: Scope,
    private $element: JQLite,
    private mapControl: acc.factories.IMapLayerFactory,
    private requestService: common.services.IRequestService
  ) {
    $scope.vm = this;
    $scope.map = new MapBuilder(
      $($element)
        .find('.map-area')
        .get(0)
    ).map();

    $scope.$on(
      ToolsEvents.LoactionChanged,
      (evt, val: acc.gis.model.ILocation) => {
        angular.forEach(this._layers, (item, idx) => {
          item.remove();
        });
        angular.forEach(val.properties.layers, (layer, idx) => {
          var newLayer = L.layerGroup().addTo($scope.map);
          this._layers.push(newLayer);
          angular.forEach(layer.items, (item, idx) => {
            this._addPointer(item, newLayer);
          });
        });
      }
    );

    this._map = $scope.map;
    this._layers = [];

    mapControl({
      templateUrl: 'modules/acc/components/gis/gisTools.html',
      controller: 'modules/acc/components/gis/gisTools',
      scope: $scope.$new(),
      resolve: {
        mapInstance: () => {
          return this._map;
        }
      }
    }).addTo($scope.map);
  }
}

mod.controller('modules/acc/components/gis/index', Controller);
