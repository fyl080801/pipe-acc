import angular = require('angular');
import 'app/application';

class Config {
  static $inject = ['$urlRouterProvider', '$stateProvider'];
  constructor(
    $urlRouterProvider: ng.ui.IUrlRouterProvider,
    $stateProvider: app.configs.IRequireStateProvider
  ) {
    $stateProvider.state('master', {
      url: '/master',
      templateUrl: 'modules/acc/views/master.html',
      requires: ['modules/acc/requires']
    });

    // $stateProvider.state('master.index', {
    //   url: '/index',
    //   templateUrl: 'modules/acc/views/master.html',
    //   requires: ['modules/acc/requires']
    // });
  }
}

export = angular.module('modules.acc', []).config(Config);
