import mod = require('modules/common/module');
import angular = require('angular');
import '../../../../bower_components/bootstrap-treeview/dist/bootstrap-treeview.min';

function directive(): ng.IDirective {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      treeData: '=bsTreeData'
    },
    link: (scope: any, instanceElement: JQLite) => {
      $(instanceElement)['treeview']({ data: scope.treeData });
    }
  };
}

mod.directive('bsTreeview', directive);
