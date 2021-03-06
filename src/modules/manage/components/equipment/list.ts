import mod = require('modules/manage/module');
import angular = require('angular');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';
import { DefaultFormTypes } from 'modules/common/configs/enums/defaultFormTypes';
import { equipmentForm } from 'modules/manage/components/equipment/forms';

interface IListScope extends ng.IScope {
  vm: Controller;
  search: any;
  jexcel: jexcel.IJExcelOptions;
  data: any[];
  table: any;
}

class Controller {
  private categorySelector;
  private cabinSelector;

  private _modal(model) {
    for (var n in model) {
      if (model[n] === null || model[n] === undefined) {
        delete model[n];
      }
    }
    return this.schemaPopup.confirm(
      $.extend(
        {
          title: '添加设备',
          model: model
        },
        equipmentForm(
          this.schemaFormParams,
          this.$modal,
          this.categorySelector,
          this.cabinSelector
        )
      )
    ).result;
  }

  static $inject = [
    '$scope',
    '$rootScope',
    '$modal',
    '$jexcelEditor',
    'modules/common/factories/schemaFormParams',
    'modules/common/services/requestService',
    'modules/common/factories/ngTableRequest',
    'modules/common/services/schemaPopup',
    'app/services/popupService'
  ];
  constructor(
    private $scope: IListScope,
    private $rootScope: ng.IRootScopeService,
    private $modal: ng.ui.bootstrap.IModalService,
    private $jexcelEditor: manage.IJExcelEditorFactory,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory,
    private requestService: common.services.IRequestService,
    private ngTableRequest: common.factories.INgTableRequestFactory,
    private schemaPopup: common.services.ISchemaPopup,
    private popupService: app.services.IPopupService
  ) {
    this.categorySelector = {
      templateUrl: 'modules/manage/templates/popupSelector.html',
      controller: 'modules/manage/controllers/popupSelector',
      resolve: {
        listPromise: () => {
          return requestService
            .url('/api/acc/equipment/allcategories')
            .get()
            .result.then(result => {
              return {
                key: 'equipmentTypes',
                list: result
              };
            });
        }
      }
    };

    this.cabinSelector = {
      templateUrl: 'modules/manage/templates/popupSelector.html',
      controller: 'modules/manage/controllers/popupSelector',
      resolve: {
        listPromise: () => {
          return requestService
            .url('/api/acc/cabin')
            .get()
            .result.then(result => {
              return result;
            });
        }
      }
    } as ng.ui.bootstrap.IModalSettings;

    $scope.vm = this;
    $scope.search = { keyword: '' };
    $scope.jexcel = {
      allowInsertColumn: false,
      allowInsertRow: false,
      allowDeleteRow: false,
      allowDeleteColumn: false,
      colWidths: ['25%', '25%', '25%', '25%'],
      colHeaders: ['设备编号', '设备名称', '所属类别', '所在舱室'],
      columns: [
        { type: 'text' },
        { type: 'text' },
        {
          type: 'text',
          editor: $jexcelEditor('modalEditor')(this.categorySelector)
        },
        {
          type: 'text',
          editor: $jexcelEditor('modalEditor')(this.cabinSelector)
        }
      ]
    };

    $scope.table = ngTableRequest({
      url: '/api/acc/equipment/query',
      showLoading: false
    }).table();

    $scope.$watch(
      () => {
        return $scope.table.data;
      },
      newvalue => {
        $scope.jexcel.data = [];
        $.each(newvalue, (idx, item) => {
          var row = [];
          $.each(item, (name, col) => {
            row.push(col);
          });
          $scope.jexcel.data.push(row);
        });
      }
    );
  }

  keywordCallback() {
    this.$scope.table.reload();
  }

  create() {
    this._modal({}).then(data => {
      this.requestService
        .url('/api/acc/equipment')
        .post(data)
        .result.then(() => {
          this.$scope.table.reload();
        });
    });
  }

  edit(row) {
    this.requestService
      .url('/api/acc/equipment/' + row.id)
      .get()
      .result.then((result: any) => {
        this._modal(result).then(data => {
          this.requestService
            .url('/api/acc/equipment')
            .put(data)
            .result.then(() => {
              this.$scope.table.reload();
            });
        });
      });
  }

  drop(row) {
    this.popupService.confirm('是否删除？').ok(() => {
      this.requestService
        .url('/api/acc/equipment/' + row.id)
        .drop()
        .result.then(() => {
          this.$scope.table.reload();
        });
    });
  }
}

mod.controller('modules/manage/components/equipment/list', Controller);
