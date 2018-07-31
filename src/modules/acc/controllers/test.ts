import mod = require('modules/acc/module');
import angular = require('angular');
import { ExtendFormFields } from 'modules/common/configs/enums/extendFormFields';

class Controller {
  static $inject = [
    '$scope',
    '$rootScope',
    '$modal',
    'modules/common/factories/schemaFormParams'
  ];
  constructor(
    private $scope,
    private $rootScope: ng.IRootScopeService,
    private $modal: ng.ui.bootstrap.IModalService,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory
  ) {
    $scope.vm = this;
  }

  formtest() {
    this.$modal.open({
      templateUrl: 'modules/common/templates/schemaConfirm.html',
      scope: angular.extend(this.$rootScope.$new(), {
        $data: {
          title: 'aaaaaaaaaaa',
          formParams: this.schemaFormParams({
            required: ['testfield1']
          }).properties({
            testfield1: {
              type: 'string'
            },
            testfield2: {
              type: 'string'
            },
            testfield3: {
              type: 'string'
            }
          }),
          form: [
            {
              title: '级联字段',
              type: ExtendFormFields.cascade,
              items: ['testfield1', 'testfield2', 'testfield3']
            }
          ],
          model: {}
        }
      })
    });
  }
}

mod.controller('modules/acc/controllers/test', Controller);
