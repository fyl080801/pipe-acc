import mod = require('modules/manage/module');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {
    $scope.menu = [
      {
        icon: 'fas fa-toolbox fa-fw',
        text: '系统参数',
        menu: [
          {
            text: '点位管理',
            href: '/master/manage/varlist'
          },
          {
            text: '地图设置',
            href: '/master/manage/varlist'
          }
        ]
      },
      {
        icon: 'fas fa-building fa-fw',
        text: '业务管理',
        menu: [
          {
            text: '设备管理',
            href: '/master/manage/equipment'
          },
          {
            text: '报修管理',
            href: '/master/manage/varlist'
          }
        ]
      }
    ];
  }
}

mod.controller('modules/manage/controllers/manage', Controller);
