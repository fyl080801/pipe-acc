import mod = require('modules/acc/module');

class Controller {
  static $inject = ['$scope', 'app/services/popupService'];
  constructor(
    private $scope,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;
  }

  exit() {
    this.popupService.confirm('是否退出？').ok(() => {});
  }
}

mod.controller('modules/acc/controllers/master', Controller);
