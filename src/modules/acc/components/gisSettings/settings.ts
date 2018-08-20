import mod = require('modules/acc/module');
import angular = require('angular');
import L = require('leaflet');
import { mapview } from 'modules/acc/components/gisSettings/forms';
import { MapBuilder } from 'modules/acc/extend/leaflet/mapBuilder';
import {
  EditorEvents,
  LayerEvents,
  MapEvents
} from 'modules/acc/components/gisSettings/editorEvents';

class Controller {
  static $inject = [
    '$scope',
    '$stateParams',
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
    $scope.vmLayer = null;
    $scope.vmMap = null;
    $scope.model = null;
    $scope.map = null;

    $scope.$on(LayerEvents.LayerInit, (evt, ctl) => {
      $scope.vmLayer = ctl;
    });

    $scope.$on(LayerEvents.LayerAdded, (evt, val) => {
      $scope.$broadcast(EditorEvents.LayerAdded, val);
    });

    $scope.$on(LayerEvents.LayerRemoved, (evt, val) => {
      $scope.$broadcast(EditorEvents.LayerRemoved, val);
    });

    $scope.$on(LayerEvents.LayerChanged, (evt, val) => {
      $scope.$broadcast(EditorEvents.LayerChanged, val);
    });

    $scope.$on(MapEvents.PointerAdded, (evt, item, layer) => {
      //$scope.model.properties.
    });

    $scope.$on(MapEvents.MapInit, (evt, map) => {
      $scope.vmMap = map;
      $scope.map = map.getMap();
    });

    $scope.$on(MapEvents.NoLayer, evt => {
      if (!$scope.vmLayer) return;

      $scope.model.properties.layers = $scope.model.properties.layers || [];
      if ($scope.model.properties.layers.length <= 0) {
        $scope.vmLayer.addLayer();
      } else {
        $scope.vmLayer.selectLayer($scope.model.properties.layers[0]);
      }
    });
  }

  loadLocation() {
    this.requestService
      .url('/api/acc/location/' + this.$stateParams.id)
      .options({ showLoading: false })
      .get<acc.gis.model.ILocation>()
      .result.then(result => {
        this.$scope.model = result;
        this.$scope.$broadcast(EditorEvents.ModelLoaded, result);
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

  addGeoJson() {}
}

mod.controller('modules/acc/components/gisSettings/settings', Controller);
