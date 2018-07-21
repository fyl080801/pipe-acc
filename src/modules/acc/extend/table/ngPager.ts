import mod = require('modules/acc/module');

mod.directive('ngPager', [
  function() {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        pagerSource: '=ngPager'
      },
      template:
        '<div ng-table-pagination="pagerSource" template-url="\'ng-pager/pager.html\'"></div>'
    };
  }
]);
