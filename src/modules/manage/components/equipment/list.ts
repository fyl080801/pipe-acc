import mod = require('modules/manage/module');
import angular = require('angular');

interface IListScope extends ng.IScope {
  vm: Controller;
  search: any;
  jexcel: jexcel.IJExcelOptions;
}

class Controller {
  static $inject = [
    '$scope',
    '$jexcelEditor',
    'modules/acc/services/requestService'
  ];
  constructor(
    private $scope: IListScope,
    private $jexcelEditor: manage.IJExcelEditorFactory,
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
  }

  keywordCallback() {}

  create() {}
}

mod.controller('modules/manage/components/equipment/list', Controller);
