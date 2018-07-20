import mod = require('modules/manage/module');
import angular = require('angular');

interface IListScope extends ng.IScope {
  vm: Controller;
  search: any;
  jexcel: jexcel.IJExcelOptions;
  data: any[];
}

class Controller {
  static $inject = [
    '$scope',
    '$rootScope',
    '$modal',
    '$jexcelEditor',
    'modules/acc/factories/schemaFormParams',
    'modules/acc/services/requestService'
  ];
  constructor(
    private $scope: IListScope,
    private $rootScope: ng.IRootScopeService,
    private $modal: ng.ui.bootstrap.IModalService,
    private $jexcelEditor: manage.IJExcelEditorFactory,
    private schemaFormParams: acc.factories.ISchemaFormParamsFactory,
    private requestService: acc.services.IRequestService
  ) {
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
          editor: $jexcelEditor('modalEditor')({
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
          } as ng.ui.bootstrap.IModalSettings)
        },
        {
          type: 'text',
          editor: $jexcelEditor('modalEditor')({
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
          } as ng.ui.bootstrap.IModalSettings)
        }
      ]
    };

    $scope.$watch(
      () => {
        return $scope.data;
      },
      () => {}
    );
  }

  keywordCallback() {
    // return this.requestService
    //   .url('')
    //   .options({
    //     showLoading: false
    //   })
    //   .post({})
    //   .result.then((result: any) => {
    //     this.$scope.data = result.data;
    //   });
  }

  create() {
    this.$modal
      .open({
        templateUrl: 'modules/acc/templates/schemaConfirm.html',
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
                category: {
                  title: '类型',
                  type: 'string'
                },
                cabin: {
                  title: '所在舱室',
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
                    items: ['category']
                  },
                  {
                    type: 'section',
                    htmlClass: 'col-md-6',
                    items: ['cabin']
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
