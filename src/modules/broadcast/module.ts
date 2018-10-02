import angular = require('angular');
import 'modules/broadcast/configs/run';
import 'modules/broadcast/configs/httpConfig';

export = angular.module('modules.broadcast', ['modules.broadcast.configs']);
