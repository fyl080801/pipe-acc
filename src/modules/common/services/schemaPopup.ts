import mod = require('modules/common/module');
import angular = require('angular');

class Service implements common.services.ISchemaPopup {
  static $inject = ['$rootScope', '$modal'];
  constructor(
    private $rootScope: ng.IRootScopeService,
    private $modal: ng.ui.bootstrap.IModalService
  ) {}

  confirm(
    options: common.services.ISchemaPopupOptions
  ): ng.ui.bootstrap.IModalInstanceService {
    return this.$modal.open({
      templateUrl: 'modules/common/templates/schemaConfirm.html',
      scope: angular.extend(this.$rootScope.$new(), {
        $data: options
      })
    });
  }
}

mod.service('modules/common/services/schemaPopup', Service);
