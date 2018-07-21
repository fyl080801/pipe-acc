import angular = require('angular');
import 'modules/manage/providers/jexcelEditor';
import 'modules/manage/configs/jexcel/modalEditor';
import 'modules/acc/extend/table/ngTableModule';
import 'modules/manage/configs/run';

export = angular.module('modules.manage', ['modules.manage.configs']);
