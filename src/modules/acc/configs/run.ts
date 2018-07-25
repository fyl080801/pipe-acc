import cfg = require('modules/acc/configs');

class Config {
  static $inject = ['$urlRouterProvider', '$stateProvider'];
  constructor(
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $stateProvider: app.IRequireStateProvider
  ) {
    $stateProvider.state('master', {
      url: '/master',
      templateUrl: 'modules/acc/views/master.html',
      requires: ['modules/acc/requires', 'modules/common/requires']
    });

    $stateProvider.state('master.homeindex', {
      url: '/homeindex',
      templateUrl: 'modules/acc/components/home/index.html',
      requires: ['modules/acc/requires', 'modules/common/requires']
    });

    $stateProvider.state('master.gissettings', {
      url: '/gissettings',
      templateUrl: 'modules/acc/components/gisSettings/settings.html',
      requires: ['modules/acc/requires', 'modules/common/requires']
    });

    $stateProvider.state('master.gisindex', {
      url: '/gisindex',
      templateUrl: 'modules/acc/components/gis/index.html',
      requires: ['modules/acc/requires', 'modules/common/requires']
    });

    $urlRouterProvider.otherwise('/master/homeindex');
  }
}

cfg.config(Config);
