import mod = require('modules/manage/module');
import angular = require('angular');

class Controller {
  static $inject = ['$scope', '$state', '$location', '$modal'];
  constructor(
    private $scope,
    private $state: ng.ui.IStateService,
    private $location: ng.ILocationService,
    private $modal: ng.ui.bootstrap.IModalService
  ) {
    $scope.vm = this;
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
            text: '设备管理',
            href: '/master/manage/equipment'
          },
          {
            text: '点位管理',
            href: '/master/manage/varlist'
          },
          {
            text: '地图设置',
            href: '/master/gissettings'
          }
        ]
      }
    ];
  }

  action(menu) {
    if (menu.state) {
      this.$state.go(menu.href, {});
    } else if (angular.isFunction(menu.action)) {
      menu.action();
    } else if (menu.href) {
      this.$location.url(menu.href);
    }
  }
}

mod.controller('modules/manage/controllers/manage', Controller);
