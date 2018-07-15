import mod = require('modules/manage/module');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {
    $scope.menu = [
      {
        icon: 'fas fa-toolbox fa-fw',
        text: '入廊管理',
        menu: [
          {
            text: '设备发放'
          },
          {
            text: '设备回收'
          },
          {
            text: '设备使用情况'
          },
          {
            text: '巡检计划'
          },
          {
            text: '巡检结果'
          }
        ]
      },
      {
        icon: 'fas fa-building fa-fw',
        text: '信息管理',
        menu: [
          {
            text: '外部单位信息管理'
          },
          {
            text: '合同信息管理'
          }
        ]
      },
      {
        icon: 'fas fa-building fa-fw',
        text: '库存管理',
        menu: [
          {
            text: '出入库管理'
          },
          {
            text: '查看库存'
          },
          {
            text: '物料使用情况'
          },
          {
            text: '采购申请'
          }
        ]
      },
      {
        icon: 'fas fa-cog fa-fw',
        text: '系统设置',
        menu: [
          {
            text: '参数管理',
            href: '/master/manage/settings'
          },
          {
            text: '点位管理',
            href: '/master/manage/varlist'
          },
          {
            text: '地图设置',
            href: '/master/manage/varlist'
          }
        ]
      }
    ];
  }
}

mod.controller('modules/manage/controllers/manage', Controller);
