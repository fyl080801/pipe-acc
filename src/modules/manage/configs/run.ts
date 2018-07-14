import cfg = require('modules/manage/configs');

class Config {
  static $inject = ['$stateProvider'];
  constructor($stateProvider: app.configs.IRequireStateProvider) {
    $stateProvider.state('master.manage', {
      url: '/manage',
      templateUrl: 'modules/manage/views/manage.html',
      requires: ['modules/acc/requires', 'modules/manage/requires']
    });

    $stateProvider.state('master.manage.varlist', {
      url: '/varlist',
      title: '点位管理',
      templateUrl: 'modules/manage/components/vars/list.html',
      requires: ['modules/manage/requires']
    });

    $stateProvider.state('master.manage.equipment', {
      url: '/equipment',
      title: '设备管理',
      templateUrl: 'modules/manage/components/equipment/list.html',
      requires: ['modules/manage/requires']
    });
  }
}

cfg.config(Config);