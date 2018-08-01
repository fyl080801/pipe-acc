import angular = require('angular');
import 'app/application';
import '../../../bower_components/signalr/jquery.signalR';
import '../../../bower_components/angular-signalr-hub/signalr-hub';
import '../../../bower_components/ngDraggable/ngDraggable';

export = angular.module('modules.acc.configs', [
  'ui.router',
  'SignalR',
  'ngDraggable'
]);
