import mod = require('modules/common/module');
import angular = require('angular');

mod.directive('ngTablePagination', [
  '$compile',
  'modules/common/extend/table/ngTableEventsChannel',
  function($compile, ngTableEventsChannel) {
    return {
      restrict: 'A',
      scope: {
        params: '=ngTablePagination',
        templateUrl: '='
      },
      replace: false,
      link: function(scope: any, element /*, attrs*/) {
        ngTableEventsChannel.onAfterReloadData(
          function(pubParams) {
            scope.pages = pubParams.generatePagesArray();
          },
          scope,
          function(pubParams) {
            return pubParams === scope.params;
          }
        );

        scope.$watch('templateUrl', function(templateUrl) {
          if (angular.isUndefined(templateUrl)) {
            return;
          }
          var template = angular.element(document.createElement('div'));
          template.attr({
            'ng-include': 'templateUrl'
          });
          element.append(template);
          $compile(template)(scope);
        });
      }
    };
  }
]);
