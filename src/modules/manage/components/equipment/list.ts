import mod = require('modules/manage/module');
import angular = require('angular');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';

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

  static $inject = [
    '$scope',
    '$rootScope',
    '$modal',
    '$jexcelEditor',
    'modules/common/factories/schemaFormParams',
    'modules/common/services/requestService',
    'modules/common/factories/ngTableRequest'
  ];
  constructor(
    private $scope: IListScope,
    private $rootScope: ng.IRootScopeService,
    private $modal: ng.ui.bootstrap.IModalService,
    private $jexcelEditor: manage.IJExcelEditorFactory,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory,
    private requestService: common.services.IRequestService,
    private ngTableRequest: common.factories.INgTableRequestFactory
  ) {
    this.categorySelector = {
      templateUrl: 'modules/manage/templates/popupSelector.html',
      controller: 'modules/manage/controllers/popupSelector',
      resolve: {
        listPromise: () => {
          return requestService
            .url('/api/acc/equipment/category')
            .get()
            .result.then(result => {
              return result;
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
        return $scope.data;
      },
      () => {}
    );
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
            title: '添加设备',
            formParams: this.schemaFormParams({
              properties: {
                code: {
                  title: '设备编号',
                  type: 'string',
                  required: true
                },
                name: {
                  title: '设备名称',
                  type: 'string',
                  required: true
                },
                categoryCode: {
                  title: '类型',
                  type: 'string'
                },
                categoryName: {
                  title: '类型名',
                  type: 'string'
                },
                cabinCode: {
                  title: '所在舱室',
                  type: 'string'
                },
                cabinName: {
                  title: '所在舱室名',
                  type: 'string'
                }
              }
            }),
            form: [
              'code',
              'name',
              {
                type: 'section',
                htmlClass: 'row',
                items: [
                  {
                    type: 'section',
                    htmlClass: 'col-md-6',
                    items: [
                      {
                        key: 'categoryCode',
                        type: ExtendFormFields.actionField,
                        action: (form, defer: ng.IDeferred<any>) => {
                          this.$modal
                            .open(this.categorySelector)
                            .result.then(defer.resolve);
                        },
                        callback: result => {
                          console.log(result);
                        }
                      }
                    ]
                  },
                  {
                    type: 'section',
                    htmlClass: 'col-md-6',
                    items: [
                      {
                        key: 'cabinCode',
                        type: ExtendFormFields.actionField,
                        action: (form, defer) => {
                          this.$modal
                            .open(this.cabinSelector)
                            .result.then(defer.resolve);
                        },
                        callback: result => {}
                      }
                    ]
                  }
                ]
              }
            ],
            model: {}
          }
        })
      })
      .result.then(data => {});
  }
}

mod.controller('modules/manage/components/equipment/list', Controller);
