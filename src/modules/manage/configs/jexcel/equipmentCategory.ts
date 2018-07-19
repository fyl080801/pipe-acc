import cfg = require('modules/manage/configs');
import angular = require('angular');
import { EditorBase } from './editorBase';

class EquipmentCategory extends EditorBase {
  onEdit(cell: JQLite, value: any): angular.IPromise<any> {
    return this.$modal.open({
      templateUrl: 'modules/manage/configs/jexcel/equipmentCategory.html',
      scope: angular.extend(this.$rootScope.$new(), {
        val: value
      })
    }).result;
  }
  constructor(
    private $modal: ng.ui.bootstrap.IModalService,
    private $rootScope: ng.IRootScopeService
  ) {
    super();
  }
}

class Config {
  static $inject = ['$jexcelEditorProvider'];
  constructor($jexcelEditorProvider: manage.IJExcelEditorProvider) {
    $jexcelEditorProvider.register('equipmentCategory', [
      '$modal',
      '$rootScope',
      ($modal, $rootScope) => {
        return () => new EquipmentCategory($modal, $rootScope);
      }
    ]);
  }
}

cfg.config(Config);
