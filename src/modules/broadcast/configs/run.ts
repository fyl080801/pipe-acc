import cfg = require('modules/broadcast/configs');

class Config {
  static $inject = ['$urlRouterProvider', '$stateProvider'];
  constructor(
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $stateProvider: app.IRequireStateProvider
  ) {
    var indexView = $('#app').attr('index-view');

    $urlRouterProvider.otherwise(indexView);

    // 首页
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: 'modules/broadcast/components/dashboard/index.html',
      requires: ['modules/common/requires', 'modules/broadcast/requires']
    });

    // 区域 + 终端
    $stateProvider.state('terminal', {
      url: '/terminal',
      templateUrl: 'modules/broadcast/components/terminal/list.html',
      requires: ['modules/common/requires', 'modules/broadcast/requires']
    });

    // $stateProvider.state('location', {
    //   url: '/location',
    //   templateUrl: 'modules/broadcast/components/terminal/location.html',
    //   requires: ['modules/common/requires', 'modules/broadcast/requires']
    // });

    // 节目管理
    $stateProvider.state('broadcast', {
      url: '/broadcast',
      templateUrl: 'modules/broadcast/components/broadcast/dailyList.html',
      requires: ['modules/common/requires', 'modules/broadcast/requires']
    });

    $stateProvider.state('cast', {
      url: '/cast',
      templateUrl: 'modules/broadcast/components/broadcast/cast.html',
      requires: ['modules/common/requires', 'modules/broadcast/requires']
    });
  }
}

cfg.config(Config);
