import mod = require('modules/broadcast/module');
import angular = require('angular');
import {
  areaForm,
  terminalForm
} from 'modules/broadcast/components/terminal/forms';

class Controller {
  static $inject = [
    '$scope',
    '$rootScope',
    '$modal',
    'modules/common/factories/schemaFormParams',
    'app/services/popupService'
  ];
  constructor(
    private $scope,
    private $rootScope,
    private $modal: ng.ui.bootstrap.IModalService,
    private schemaFormParams,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;

    // 当前选中区域
    $scope.currentArea = null;

    // 区域
    $scope.areas = [];

    // 设备
    $scope.dataList = [];
  }

  addArea() {
    this.$modal
      .open({
        templateUrl: 'modules/broadcast/components/terminal/deviceForm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '新建区域',
              model: {}
            },
            areaForm(this.schemaFormParams)
          )
        }),
        size: 'lg'
      })
      .result.then(data => {
        if (!this.$scope.currentArea) {
          this.$scope.areas.push($.extend(data, { areas: [] }));
        } else {
          this.$scope.currentArea.areas.push(
            $.extend(data, {
              areas: []
              // parentId: this.$scope.currentArea.id // 先不写，到时候看看是怎么添加到数据库，如何生成id
            })
          );
        }
      });
  }

  editArea(scope, $event: Event) {
    this.$modal
      .open({
        templateUrl: 'modules/broadcast/components/terminal/deviceForm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '编辑区域',
              model: $.extend({}, scope.area)
            },
            areaForm(this.schemaFormParams)
          )
        }),
        size: 'lg'
      })
      .result.then(data => {
        scope.area = data;
      });

    $event.stopPropagation();
  }

  removeArea(scope) {
    this.popupService.confirm('是否删除？').ok(() => {});
  }

  selectArea(area) {
    this.$scope.currentArea = this.$scope.currentArea === area ? null : area;
  }

  addTerminal() {
    var model = {};
    this.$modal
      .open({
        templateUrl: 'modules/broadcast/components/terminal/deviceForm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '新建设备',
              model: model
            },
            terminalForm(this.schemaFormParams, model)
          )
        }),
        size: 'lg'
      })
      .result.then(data => {
        this.$scope.dataList.push(data);
      });
  }

  editTerminal(scope) {
    var model = $.extend({}, scope.row);
    this.$modal
      .open({
        templateUrl: 'modules/broadcast/components/terminal/deviceForm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '编辑设备',
              model: model
            },
            terminalForm(this.schemaFormParams, model)
          )
        }),
        size: 'lg'
      })
      .result.then(data => {
        scope.row = data;
      });
  }

  removeTreminal(scope) {
    this.popupService.confirm('是否删除？').ok(() => {});
  }
}

mod.controller('modules/broadcast/components/terminal/list', Controller);