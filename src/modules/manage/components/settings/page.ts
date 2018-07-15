import mod = require('modules/manage/module');

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {
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
}

mod.controller('modules/manage/components/settings/page', Controller);
