import mod = require('modules/acc/module');

class Controller {
  test() {
    this.$modal.open({
      templateUrl: 'modules/acc/components/monitor/voiceAlert.html'
    });
  }

  static $inject = ['$scope', '$modal'];
  constructor(private $scope, private $modal: ng.ui.bootstrap.IModalService) {
    $scope.vm = this;
  }
}

mod.controller('modules/acc/controllers/gisTools', Controller);
