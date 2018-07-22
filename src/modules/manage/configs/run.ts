import cfg = require('modules/manage/configs');

class Config {
  static $inject = ['$stateProvider'];
  constructor($stateProvider: app.IRequireStateProvider) {
    $stateProvider.state('master.manage', {
      url: '/manage',
      templateUrl: 'modules/manage/views/manage.html',
      requires: [
        'modules/acc/requires',
        'modules/manage/requires',
        'modules/common/requires'
      ]
    });

    $stateProvider.state('master.manage.settings', {
      url: '/settings',
      title: '参数管理',
      templateUrl: 'modules/manage/components/settings/page.html',
      requires: ['modules/manage/requires', 'modules/common/requires']
    });

    $stateProvider.state('master.manage.varlist', {
      url: '/varlist',
      title: '点位管理',
      templateUrl: 'modules/manage/components/vars/list.html',
      requires: ['modules/manage/requires', 'modules/common/requires']
    });

    $stateProvider.state('master.manage.equipment', {
      url: '/equipment',
      title: '设备管理',
      templateUrl: 'modules/manage/components/equipment/list.html',
      requires: ['modules/manage/requires', 'modules/common/requires']
    });
  }
}

cfg.config(Config);
