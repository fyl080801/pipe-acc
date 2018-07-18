import mod = require('modules/acc/module');
import angular = require('angular');

class Controller {
  private _delayTrigger;

  static $inject = ['$scope', 'modules/acc/factories/delayTimer'];
  constructor(private $scope, private delayTimer) {
    $scope.vm = this;

    this._delayTrigger = new delayTimer({
      callback: $scope.callback || angular.noop,
      canceling: $scope.canceling || angular.noop,
      timeout: $scope.timeout ? $scope.timeout : 800
    });
  }

  modelChanged() {
    this._delayTrigger.invoke();
  }

  reset() {
    this.$scope.ngModel = '';
    this._delayTrigger.invoke();
  }
}

function directive() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      ngModel: '=',
      mark: '=',
      callback: '&',
      canceling: '&',
      timeout: '@'
    },
    templateUrl: 'modules/acc/templates/triggerInput.html',
    controller: Controller
  };
}

mod.directive('triggerInput', directive);
