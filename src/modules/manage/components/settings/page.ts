import mod = require('modules/manage/module');

class Controller {
  static $inject = ['$scope', 'modules/common/services/requestService'];
  constructor(
    private $scope,
    private requestService: common.services.IRequestService
  ) {
    $scope.vm = this;
    $scope.categories = [];
    $scope.cabins = [];

    // requestService
    //   .url('/api/acc/equipment/category')
    //   .options({
    //     showLoading: false
    //   })
    //   .get()
    //   .result.then((result: any) => {
    //     $scope.categories =
    //       result && result.children && result.children.length > 0
    //         ? result.children
    //         : [];
    //   });

    // requestService
    //   .url('/api/acc/cabin')
    //   .options({
    //     showLoading: false
    //   })
    //   .get()
    //   .result.then((result: any) => {
    //     $scope.cabins =
    //       result && result.children && result.children.length > 0
    //         ? result.children
    //         : [];
    //   });

    // $scope.schema = {
    //   type: 'object',
    //   properties: {
    //     name: {
    //       type: 'string',
    //       minLength: 2,
    //       title: 'Name',
    //       description: 'Name or alias'
    //     },
    //     title: {
    //       type: 'string',
    //       enum: ['dr', 'jr', 'sir', 'mrs', 'mr', 'NaN', 'dj']
    //     }
    //   }
    // };

    // $scope.form = [
    //   '*',
    //   {
    //     type: 'submit',
    //     title: 'Save'
    //   }
    // ];

    // $scope.model = {};
  }

  addCategory() {
    this.$scope.categories.push({
      code: this.$scope.newCategory,
      name: this.$scope.newCategory,
      children: []
    });
  }

  addCabin() {
    this.$scope.cabins.push({
      code: this.$scope.newCabin,
      name: this.$scope.newCabin,
      children: []
    });
  }

  save() {
    this.requestService
      .url('/api/acc/equipment/category')
      .post({
        children: this.$scope.categories
      })
      .result.then(() => {});

    this.requestService
      .url('/api/acc/cabin')
      .post({
        children: this.$scope.cabins
      })
      .result.then(() => {});
  }
}

mod.controller('modules/manage/components/settings/page', Controller);
