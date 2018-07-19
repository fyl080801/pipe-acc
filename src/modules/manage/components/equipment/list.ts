import mod = require('modules/manage/module');
import angular = require('angular');

class Controller {
  static $inject = ['$scope', '$rootScope', '$jexcelEditor'];
  constructor(
    private $scope: any | ng.IScope,
    private $rootScope,
    private $jexcelEditor: manage.IJExcelEditorFactory
  ) {
    $scope.vm = this;
    $scope.search = { keyword: '' };
    $scope.jexcel = {
      colHeaders: ['设备编号', '设备名称', '所属类别', '所在舱室'],
      columns: [
        { type: 'text' },
        { type: 'text' },
        {
          type: 'text',
          editor: $jexcelEditor('modalEditor')({
            template: '<div>aaaaaaaaaaaaaaaaa</div>'
          })
        },
        {
          type: 'text',
          editor: $jexcelEditor('modalEditor')({
            templateUrl: 'modules/manage/configs/jexcel/equipmentCategory.html'
          })
        }
      ]
    };
  }

  keywordCallback() {}

  create() {}
}

mod.controller('modules/manage/components/equipment/list', Controller);
