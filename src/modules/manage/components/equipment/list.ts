import mod = require('modules/manage/module');

class Controller {
  static $inject = [
    '$scope',
    '$element',
    'modules/manage/factories/jexcel/equipmentCategory'
  ];
  constructor(
    private $scope: any | ng.IScope,
    private $element,
    private equipmentCategory: manage.EquipmentCategory
  ) {
    $scope.vm = this;
    $scope.search = { keyword: '' };
    $scope.jexcel = {
      colHeaders: ['设备编号', '设备名称', '所属类别', '所在舱室'],
      columns: [
        { type: 'text' },
        { type: 'text' },
        { type: 'text', editor: equipmentCategory() },
        { type: 'text', editor: equipmentCategory() }
      ]
    };
  }

  keywordCallback() {}

  create() {}
}

mod.controller('modules/manage/components/equipment/list', Controller);
