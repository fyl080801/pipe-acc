import mod = require('modules/acc/module');

class Controller {
  static $inject = ['$scope', 'modules/acc/services/requestService'];
  constructor(
    private $scope,
    private requestService: acc.services.IRequestService
  ) {
    $scope.vm = this;
    $scope.filterType = 0;

    $scope.cabins = [];
    $scope.categories = [];

    $scope.selectedCabins = {};
    $scope.selectedCategories = {};

    requestService
      .url('/api/acc/cabin')
      .options({
        showLoading: false
      })
      .get()
      .result.then((result: any) => {
        $scope.cabins =
          result && result.children && result.children.length > 0
            ? result.children
            : [];
      });

    requestService
      .url('/api/acc/equipment/category')
      .options({
        showLoading: false
      })
      .get()
      .result.then((result: any) => {
        $scope.categories =
          result && result.children && result.children.length > 0
            ? result.children
            : [];
      });
  }

  selectCabin(item) {
    if (this.$scope.selectedCabins[item.code]) {
      delete this.$scope.selectedCabins[item.code];
    } else {
      this.$scope.selectedCabins[item.code] = item;
    }
  }

  selectCategory(item) {
    if (this.$scope.selectedCategories[item.code]) {
      delete this.$scope.selectedCategories[item.code];
    } else {
      this.$scope.selectedCategories[item.code] = item;
    }
  }
}

mod.controller('modules/acc/components/gis/equipmentFilter', Controller);