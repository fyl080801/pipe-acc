import mod = require('modules/acc/module');

mod.directive('ngTableSorterRow', [
  function ngTableSorterRow() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'ng-table/sorterRow.html',
      scope: true,
      controller: 'modules/acc/extend/table/ngTableSorterRowController'
    };
    return directive;
  }
]);
