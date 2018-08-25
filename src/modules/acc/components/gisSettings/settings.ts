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
    $scope.editingLayer = null;
    $scope.center = $.extend({}, mapDefaults.defaults.center);
    $scope.model = {
      id: 0,
      name: '',
      favorite: false,
      properties: mapDefaults
    };
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
