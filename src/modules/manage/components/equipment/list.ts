import mod = require('modules/manage/module');

class Controller {
  static $inject = ['$scope', '$element', '$jexcelEditor'];
  constructor(
    private $scope: any | ng.IScope,
    private $element,
    private $jexcelEditor
  ) {
    $scope.vm = this;
    $scope.search = { keyword: '' };
    $scope.jexcel = {
      colHeaders: ['设备编号', '设备名称', '所属类别', '所在舱室'],
      columns: [
        { type: 'text' },
        { type: 'text' },
        { type: 'text', editor: $jexcelEditor('equipmentCategory') },
        { type: 'text', editor: $jexcelEditor('equipmentCategory') }
      ]
    };
  }

  keywordCallback() {}

  create() {}
}

mod.controller('modules/manage/components/equipment/list', Controller);
