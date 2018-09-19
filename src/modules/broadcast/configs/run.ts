import cfg = require('modules/broadcast/configs');

class Config {
  static $inject = ['$urlRouterProvider', '$stateProvider'];
  constructor(
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $stateProvider: app.IRequireStateProvider
  ) {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: 'modules/broadcast/components/dashboard/index.html',
      requires: ['modules/common/requires', 'modules/broadcast/requires']
    });

    $stateProvider.state('terminal', {
      url: '/terminal',
      templateUrl: 'modules/broadcast/components/terminal/list.html',
      requires: ['modules/common/requires', 'modules/broadcast/requires']
    });

    $stateProvider.state('location', {
      url: '/location',
      templateUrl: 'modules/broadcast/components/terminal/location.html',
      requires: ['modules/common/requires', 'modules/broadcast/requires']
    });
  }
}

cfg.config(Config);
