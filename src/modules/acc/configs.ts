import angular = require('angular');
import 'app/application';
import '../../../bower_components/angular-ui-tree/dist/angular-ui-tree';
import '../../../bower_components/signalr/jquery.signalR';
import '../../../bower_components/angular-signalr-hub/signalr-hub';

export = angular.module('modules.acc.configs', [
  'ui.router',
  'ui.tree',
  'SignalR'
]);
