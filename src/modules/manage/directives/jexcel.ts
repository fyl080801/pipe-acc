import mod = require('modules/manage/module');
import '../../../../node_modules/jexcel/dist/js/jquery.jexcel';
import 'rcss!../../../../node_modules/jexcel/dist/css/jquery.jexcel.css';
import 'rcss!../../../../node_modules/jexcel/dist/css/jquery.jexcel.bootstrap.css';

function directive(): ng.IDirective {
  return {
    scope: {
      jexcel: '='
    },
    link: (scope: any, instanceElement: JQLite) => {
      instanceElement.attr('id', 'jexcel_' + scope.$id);
      $(instanceElement).jexcel(scope.jexcel);
    }
  };
}

mod.directive('jexcel', directive);
