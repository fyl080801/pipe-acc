import mod = require('modules/broadcast/module');
import angular = require('angular');
import { dailyForm } from 'modules/broadcast/components/broadcast/form';

class Controller {
  private _delayTrigger: app.services.IDelayTimer;

  static $inject = [
    '$scope',
    '$rootScope',
    '$modal',
    'app/services/popupService',
    'modules/common/factories/schemaFormParams',
    'modules/common/services/requestService',
    'modules/broadcast/factories/ngTableRequest',
    'app/factories/delayTimer'
  ];
  constructor(
    private $scope,
    private $rootScope: ng.IRootScopeService,
    private $modal: ng.ui.bootstrap.IModalService,
    private popupService: app.services.IPopupService,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory,
    private requestService: common.services.IRequestService,
    private ngTableRequest: common.factories.INgTableRequestFactory,
    private delayTimer: app.factories.IDelayTimerFactory
  ) {
    $scope.vm = this;

    $scope.selected = null;

    $scope.search = {
      key: 'name',
      value: ''
    };

    $scope.tableParams = this.ngTableRequest({
      url: '/api/program',
      showLoading: false,
      conditions: [$scope.search]
    }).table();

    this._delayTrigger = delayTimer({
      timeout: 800
    });

    this._delayTrigger.context
      .callback(() => {
        return this.$scope.tableParams.reload();
      })
      .canceling(angular.noop);
  }

  searchChanged() {
    this._delayTrigger.invoke();
  }

  searchReset() {
    this.$scope.search.value = '';
    this._delayTrigger.invoke();
  }

  select(row) {
    this.$scope.selected = row;
  }

  save(row) {
    this.$modal
      .open({
        templateUrl: 'modules/broadcast/templates/form.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: row ? '编辑节目' : '新建节目',
              model: row ? $.extend({}, row) : { id: 0 }
            },
            dailyForm(this.schemaFormParams)
          )
        }),
        size: 'lg'
      })
      .result.then(data => {
        this.requestService
          .url('/api/program')
          .post(data)
          .result.then(() => {
            this.popupService.information(row ? '更新成功' : '新建成功');
            this.$scope.tableParams.reload();
          });
        this.$scope.selected = null;
      });
  }

  drop() {
    if (!this.$scope.selected) return;
    this.popupService.confirm('是否删除？').ok(() => {
      this.requestService
        .url('/api/program/' + this.$scope.selected.id)
        .drop()
        .result.then(() => {
          this.popupService.information('删除成功');
          this.$scope.tableParams.reload();
        });
    });
  }
}

mod.controller('modules/broadcast/components/broadcast/dailyList', Controller);
