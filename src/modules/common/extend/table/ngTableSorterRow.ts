import mod = require('modules/common/module');

mod.directive('ngTableSorterRow', [
  function ngTableSorterRow() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'ng-table/sorterRow.html',
      scope: true,
      controller: 'modules/common/extend/table/ngTableSorterRowController'
    };
    return directive;
  }
]);
