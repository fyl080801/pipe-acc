import angular = require('angular');
import 'modules/broadcast/configs/run';
import 'modules/broadcast/configs/httpConfig';
import 'modules/broadcast/configs/constants';

export = angular.module('modules.broadcast', ['modules.broadcast.configs']);
