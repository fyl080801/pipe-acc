import mod = require('modules/common/module');
import angular = require('angular');

class Controller {
  private _delayTrigger: app.services.IDelayTimer;

  static $inject = ['$scope', 'app/factories/delayTimer'];
  constructor(
    private $scope,
    private delayTimer: app.factories.IDelayTimerFactory
  ) {
    $scope.triggerInput = this;
    this._delayTrigger = delayTimer({
      timeout: $scope.timeout ? $scope.timeout : 800
    });

    this._delayTrigger.context
      .callback($scope.callback || angular.noop)
      .canceling($scope.canceling || angular.noop);
  }

  triggerModelChanged() {
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
      callback: '&tiCallback',
      canceling: '&tiCanceling',
      timeout: '@'
    },
    templateUrl: 'modules/common/templates/triggerInput.html',
    controller: Controller
  };
}

mod.directive('triggerInput', directive);
