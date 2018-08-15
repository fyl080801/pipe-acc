import mod = require('modules/acc/module');

class Controller {
  static $inject = ['$scope', 'modules/common/services/requestService'];
  constructor(
    private $scope,
    private requestService: common.services.IRequestService
  ) {
    $scope.vm = this;
    $scope.categories = [];
    $scope.equipments = [];
  }

  loadCategory() {
    this.requestService
      .url('/api/acc/equipment/allcategories')
      .options({ showLoading: false })
      .get()
      .result.then(result => {
        this.$scope.categories = result;
      });
  }

  selectCategory(cat) {
    this.requestService
      .url('/api/acc/equipment/types/' + cat.id + '/equipments')
      .options({ showLoading: false })
      .get()
      .result.then(result => {
        this.$scope.equipments = result;
      });
  }
}

mod.controller('modules/acc/components/gisSettings/toolbox', Controller);
