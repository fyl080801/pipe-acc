import mod = require('modules/manage/module');

class Controller {
  static $inject = ['$scope', 'modules/acc/services/requestService'];
  constructor(
    private $scope,
    private requestService: acc.services.IRequestService
  ) {
    $scope.vm = this;
    $scope.categories = [];

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

    $scope.schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 2,
          title: 'Name',
          description: 'Name or alias'
        },
        title: {
          type: 'string',
          enum: ['dr', 'jr', 'sir', 'mrs', 'mr', 'NaN', 'dj']
        }
      }
    };

    $scope.form = [
      '*',
      {
        type: 'submit',
        title: 'Save'
      }
    ];

    $scope.model = {};
  }

  save() {
    this.requestService
      .url('/api/acc/equipment/category')
      .post({
        children: this.$scope.categories
      })
      .result.then(() => {});
  }
}

mod.controller('modules/manage/components/settings/page', Controller);
