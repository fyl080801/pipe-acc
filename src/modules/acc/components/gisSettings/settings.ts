import mod = require('modules/acc/module');
import angular = require('angular');
import { mapview } from 'modules/acc/components/gisSettings/forms';
import { MapBuilder } from 'modules/acc/extend/leaflet/mapBuilder';
import {
  EditorEvents,
  LayerEvents,
  MapEvents
} from 'modules/acc/components/gisSettings/editorEvents';
import mapDefaults = require('modules/acc/configs/mapDefaults');

class Controller {
  static $inject = [
    '$scope',
    '$stateParams',
    '$q',
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
    private $scope: acc.gis.IMapScope,
    private $stateParams: ng.ui.IStateParamsService,
    private $q: ng.IQService,
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
    $scope.model = {
      id: 0,
      name: '',
      favorite: false,
      properties: mapDefaults
    };
    $scope.center = $.extend({}, mapDefaults.defaults.center);
    // $scope.map = null;
    // $scope.layerStore = null;

    // this._mapDefer = $q.defer();
    // this._modelDefer = $q.defer();

    // $q.all({
    //   map: this._mapDefer.promise,
    //   model: this._modelDefer.promise
    // }).then(result => {
    //   $scope.layerStore = layerStore(
    //     this.$scope.model.properties.layers,
    //     $scope.map
    //   );
    // });

    // $scope.$on(LayerEvents.LayerInit, (evt, ctl) => {
    //   $scope.vmLayer = ctl;
    // });

    // $scope.$on(LayerEvents.LayerAdded, (evt, val) => {
    //   $scope.$broadcast(EditorEvents.LayerAdded, val);
    // });

    // $scope.$on(LayerEvents.LayerRemoved, (evt, val) => {
    //   $scope.$broadcast(EditorEvents.LayerRemoved, val);
    // });

    // $scope.$on(LayerEvents.LayerChanged, (evt, val) => {
    //   $scope.$broadcast(EditorEvents.LayerChanged, val);
    // });

    // $scope.$on(MapEvents.PointerAdded, (evt, item, layer) => {
    //   //$scope.model.properties.
    // });

    // $scope.$on(MapEvents.MapInit, (evt, map) => {
    //   $scope.vmMap = map;
    //   $scope.map = map.getMap();
    //   this._mapDefer.resolve();
    // });

    // $scope.$on(MapEvents.NoLayer, evt => {
    //   if (!$scope.vmLayer) return;

    //   $scope.model.properties.layers = $scope.model.properties.layers || [];
    //   if ($scope.model.properties.layers.length <= 0) {
    //     $scope.vmLayer.addLayer();
    //   } else {
    //     $scope.vmLayer.selectLayer($scope.model.properties.layers[0]);
    //   }
    // });
  }

  loadLocation() {
    this.requestService
      .url('/api/acc/location/' + this.$stateParams.id)
      .options({ showLoading: false })
      .get<acc.gis.model.ILocation>()
      .result.then(result => {
        this.$scope.model = $.extend(true, { properties: mapDefaults }, result);
        this.$scope.center = $.extend(
          {},
          this.$scope.model.properties.defaults.center
        );
        this.$scope.$broadcast(EditorEvents.ModelLoaded, this.$scope.model);
      });
  }

  saveLocation() {
    this.requestService
      .url('/api/acc/location')
      .put(this.$scope.model)
      .result.then(result => {
        this.popupService.information('保存成功');
      });
  }
}

mod.controller('modules/acc/components/gisSettings/settings', Controller);
