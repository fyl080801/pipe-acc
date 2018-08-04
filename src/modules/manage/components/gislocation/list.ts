import mod = require('modules/manage/module');
import angular = require('angular');
import { DefaultFormTypes } from 'modules/common/configs/enums/defaultFormTypes';

class Controller {
  static $inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$modal',
    '$jexcelEditor',
    'modules/common/factories/schemaFormParams',
    'modules/common/services/requestService',
    'modules/common/factories/ngTableRequest',
    'app/services/popupService'
  ];
  constructor(
    private $scope,
    private $rootScope: ng.IRootScopeService,
    private $state: ng.ui.IStateService,
    private $modal: ng.ui.bootstrap.IModalService,
    private $jexcelEditor: manage.IJExcelEditorFactory,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory,
    private requestService: common.services.IRequestService,
    private ngTableRequest: common.factories.INgTableRequestFactory,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;
    $scope.search = { keyword: '' };

    $scope.table = ngTableRequest({
      url: '/api/acc/location/query',
      showLoading: false,
      data: $scope.search
    }).table();
  }

  keywordCallback() {
    this.$scope.table.reload();
  }

  create() {
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
            model: {}
          }
        })
      })
      .result.then(data => {
        this.requestService
          .url('/api/acc/location')
          .put(data)
          .result.then((result: any) => {
            this.$state.go('master.gissettings', { id: result.id });
          });
      });
  }

  edit(row) {
    this.$state.go('master.gissettings', { id: row.id });
  }

  setFavorite(row: acc.gis.model.ILocation) {
    this.requestService
      .url('/api/acc/location/favorite/' + row.id)
      .patch()
      .result.then((result: boolean) => {
        row.favorite = result;
      });
  }

  drop(row) {
    this.popupService.confirm('是否删除？').ok(() => {
      this.requestService
        .url('/api/acc/location/' + row.id)
        .drop()
        .result.then(() => {
          this.$scope.table.reload();
        });
    });
  }
}

mod.controller('modules/manage/components/gislocation/list', Controller);
