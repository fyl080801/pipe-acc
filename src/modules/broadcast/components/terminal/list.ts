import mod = require('modules/broadcast/module');
import angular = require('angular');
import {
  areaForm,
  terminalForm
} from 'modules/broadcast/components/terminal/forms';
import { AreaLevels } from 'modules/broadcast/configs/enums/areas';

class Controller {
  static $inject = [
    '$scope',
    '$rootScope',
    '$modal',
    'modules/common/factories/schemaFormParams',
    'app/services/treeUtility',
    'modules/common/services/requestService',
    'app/services/popupService'
  ];
  constructor(
    private $scope,
    private $rootScope,
    private $modal: ng.ui.bootstrap.IModalService,
    private schemaFormParams,
    private treeUtility: app.services.ITreeUtility,
    private requestService: common.services.IRequestService,
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

  private resolveLevel(area) {
    var level = 0;
    var func = a => {
      if (a.$key) {
        level++;
        func(a.$parent);
      }
    };
    func(area);
    return AreaLevels[level];
  }

  load() {
    this.requestService
      .url('/api/node?parentId=0')
      .options({ showLoading: false })
      .get()
      .result.then((result: any[]) => {
        this.treeUtility
          .toTree(result)
          .parentKey('parentId')
          .key('id')
          .result.then(tree => {
            this.$scope.areas = tree.$children;
          });
      });
  }

  addArea() {
    this.$modal
      .open({
        templateUrl: 'modules/broadcast/components/terminal/deviceForm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '新建区域',
              model: {
                pos: this.$scope.currentArea
                  ? this.$scope.currentArea.$data.pos
                  : '125.32396316528322,43.86120547712218'
              }
            },
            areaForm(this.schemaFormParams)
          )
        }),
        size: 'lg'
      })
      .result.then(data => {
        data.id = 0;
        if (this.$scope.currentArea) {
          data.nodeType = this.resolveLevel(this.$scope.currentArea);
          data.parentId = this.$scope.currentArea.$key;
        } else {
          data.nodeType = AreaLevels[0];
          data.parentId = 0;
        }

        this.requestService
          .url('/api/node/')
          .post(data)
          .result.then(result => {
            data.id = result['id'];
            this.treeUtility
              .toTree([data])
              .key('id')
              .parentKey('parentId')
              .result.then(t => {
                var node = t.$children[0];
                if (this.$scope.currentArea) {
                  node.$parent = this.$scope.currentArea;
                  this.$scope.currentArea.$children =
                    this.$scope.currentArea.$children || [];
                  this.$scope.currentArea.$children.push(node);
                } else {
                  this.$scope.areas.push(node);
                }
              });
          });
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
              model: $.extend({}, scope.area.$data)
            },
            areaForm(this.schemaFormParams)
          )
        }),
        size: 'lg'
      })
      .result.then(data => {
        this.requestService
          .url('/api/node/')
          .post(data)
          .result.then(result => {
            scope.area.$data = data;
          });
      });

    $event.stopPropagation();
  }

  removeArea(scope) {
    this.popupService.confirm('是否删除？').ok(() => {
      this.requestService
        .url('/api/node/' + scope.area.$key)
        .drop()
        .result.then(result => {
          for (var i = 0; i < scope.area.$parent.$children.length; i++) {
            if (scope.area.$parent.$children[i].$key === scope.area.$key) {
              scope.area.$parent.$children.splice(i, 1);
            }
          }
          this.$scope.currentArea = null;
        });
    });
  }

  toggleArea(scope, $event) {
    scope.toggle();

    if (!scope.collapsed) {
      this.requestService
        .url('/api/node?parentId=' + scope.area.$key)
        .options({ showLoading: false })
        .get()
        .result.then((result: any[]) => {
          this.treeUtility
            .toTree(result)
            .key('id')
            .parentKey('parentId')
            .onEach(item => {
              item.$parent = scope.area;
            })
            .result.then(areas => {
              scope.area.$children = areas.$children;
            });
        });
    }

    $event.stopPropagation();
  }

  selectArea(area) {
    this.$scope.currentArea =
      this.$scope.currentArea && this.$scope.currentArea.$key === area.$key
        ? null
        : area;
    this.requestService
      .url('/api/device/?parentId=' + this.$scope.currentArea.$key)
      .options({ showLoading: false })
      .get()
      .result.then(result => {
        this.$scope.dataList = result;
      });
  }

  addTerminal() {
    var model = {
      pos: this.$scope.currentArea.$data.pos
    };
    this.$modal
      .open({
        templateUrl: 'modules/broadcast/components/terminal/deviceForm.html',
        scope: angular.extend(this.$rootScope.$new(), {
          $data: $.extend(
            {
              title: '新建设备',
              model: model
            },
            terminalForm(this.schemaFormParams)
          )
        }),
        size: 'lg'
      })
      .result.then(data => {
        data.id = 0;
        data.parentId = this.$scope.currentArea.$key;
        this.requestService
          .url('/api/device/')
          .post(data)
          .result.then((result: any) => {
            data.id = result.id;
            this.$scope.dataList.push(data);
          });
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
        this.requestService
          .url('/api/device/')
          .post(data)
          .result.then(result => {
            scope.row = data;
          });
      });
  }

  removeTreminal(scope) {
    this.popupService.confirm('是否删除？').ok(() => {
      this.requestService
        .url('/api/device/' + scope.row.id)
        .drop()
        .result.then(result => {
          for (var i = 0; i < this.$scope.dataList.length; i++) {
            if (this.$scope.dataList[i].id === scope.row.id) {
              this.$scope.dataList.splice(i, 1);
              break;
            }
          }
        });
    });
  }
}

mod.controller('modules/broadcast/components/terminal/list', Controller);
