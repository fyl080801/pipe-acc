import mod = require('modules/manage/module');
import angular = require('angular');
import {
  categoryForm,
  equipmentTypeForm
} from 'modules/manage/components/equipment/forms';

interface Scope extends ng.IScope {
  [key: string]: any;
  vm: Controller;
}

class Controller {
  static $inject = [
    '$scope',
    '$rootScope',
    '$modal',
    'modules/common/factories/schemaFormParams',
    'modules/common/services/requestService',
    'modules/common/factories/ngTableRequest',
    'app/services/popupService'
  ];
  constructor(
    private $scope: Scope,
    private $rootScope: ng.IRootScopeService,
    private $modal: ng.ui.bootstrap.IModalService,
    private schemaFormParams: common.factories.ISchemaFormParamsFactory,
    private requestService: common.services.IRequestService,
    private ngTableRequest: common.factories.INgTableRequestFactory,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;
    $scope.categories = [];
    $scope.currentCategory = null;
    $scope.eqtypes = [];
  }

  loadCategory() {
    this.requestService
      .url('/api/acc/equipment/categories/')
      .options({ showLoading: false })
      .get()
      .result.then(result => {
        this.$scope.categories = result;
      });
  }

  addCategory() {
    this.$modal
      .open({
        templateUrl: 'modules/common/templates/schemaConfirm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '新建类别',
              model: {}
            },
            categoryForm(this.schemaFormParams)
          )
        }),
        size: 'sm'
      })
      .result.then(data => {
        this.requestService
          .url('/api/acc/equipment/categories')
          .put(data)
          .result.then(() => {
            this.loadCategory();
          });
      });
  }

  editCategory(cat) {
    this.$modal
      .open({
        templateUrl: 'modules/common/templates/schemaConfirm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '编辑类别',
              model: $.extend({}, cat)
            },
            categoryForm(this.schemaFormParams)
          )
        }),
        size: 'sm'
      })
      .result.then(data => {
        this.requestService
          .url('/api/acc/equipment/categories')
          .put(data)
          .result.then(() => {
            this.loadCategory();
          });
      });
  }

  deleteCategory(cat, evt?: Event) {
    this.popupService.confirm('是否删除？').ok(() => {
      this.requestService
        .url('/api/acc/equipment/categories/' + cat.id)
        .drop()
        .result.then(() => {
          this.loadCategory();
        });
    });
    if (evt) evt.stopPropagation();
  }

  selectCategory(cat) {
    this.$scope.currentCategory = cat;
    this.requestService
      .url('/api/acc/equipment/categories/' + cat.id + '/types')
      .options({ showLoading: false })
      .get()
      .result.then(result => {
        this.$scope.eqtypes = result;
      });
  }

  addEquipmentType() {
    this.$modal
      .open({
        templateUrl: 'modules/common/templates/schemaConfirm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '添加种类',
              model: {}
            },
            equipmentTypeForm(this.schemaFormParams)
          )
        })
      })
      .result.then(data => {
        data.categoryId = this.$scope.currentCategory.id;
        this.requestService
          .url('/api/acc/equipment/types')
          .put(data)
          .result.then(() => {
            this.selectCategory(this.$scope.currentCategory);
          });
      });
  }

  deleteEquipmentType(row) {
    this.popupService.confirm('是否删除？').ok(() => {
      this.requestService
        .url('/api/acc/equipment/types/' + row.id)
        .drop()
        .result.then(() => {
          this.selectCategory(this.$scope.currentCategory);
        });
    });
  }
}

mod.controller('modules/manage/components/equipment/categories', Controller);
