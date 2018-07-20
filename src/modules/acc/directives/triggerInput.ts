import mod = require('modules/acc/module');
import angular = require('angular');

class Controller {
  private _delayTrigger: app.services.IDelayTimer;

  static $inject = ['$scope', 'app/factories/delayTimer'];
  constructor(
    private $scope,
    private delayTimer: app.factories.IDelayTimerFactory
  ) {
    $scope.vm = this;
    this._delayTrigger = delayTimer({
      timeout: $scope.timeout ? $scope.timeout : 800
    });

    this._delayTrigger.context
      .callback($scope.callback || angular.noop)
      .canceling($scope.canceling || angular.noop);
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
