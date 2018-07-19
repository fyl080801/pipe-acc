import mod = require('modules/manage/module');
import angular = require('angular');
import '../../../../node_modules/jexcel/dist/js/jquery.jexcel';
import 'rcss!../../../../node_modules/jexcel/dist/css/jquery.jexcel.css';
import 'rcss!../../../../node_modules/jexcel/dist/css/jquery.jexcel.bootstrap.css';

interface IJExcelScope extends ng.IScope {
  jexcel: jexcel.IJExcelOptions;
}

function directive(): ng.IDirective {
  return {
    scope: {
      jexcel: '='
    },
    link: (scope: IJExcelScope, instanceElement: JQLite) => {
      instanceElement = $(instanceElement);
      instanceElement.attr('id', 'seed_jexcel_' + scope.$id);
      instanceElement.jexcel(scope.jexcel);
      //scope.jexcel = angular.extend(scope.jexcel, {});
    }
  };
}

mod.directive('jexcel', directive);
