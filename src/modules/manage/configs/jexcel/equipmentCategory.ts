import cfg = require('modules/manage/configs');
import angular = require('angular');

class EquipmentCategory implements jexcel.IEditor {
  private _value;
  constructor(
    private $modal: ng.ui.bootstrap.IModalService,
    private $rootScope: ng.IRootScopeService
  ) {}

  closeEditor(cell: JQLite, save: boolean): string {
    return this._value;
  }

  openEditor(cell: JQLite) {
    this.$modal
      .open({
        templateUrl: 'modules/manage/configs/jexcel/equipmentCategory.html',
        scope: angular.extend(this.$rootScope.$new(), {
          val: this._value
        })
      })
      .result.then(result => {
        this._value = result;
      })
      .finally(() => {
        $('#' + $.fn.jexcel.current).jexcel('closeEditor', cell, true);
      });
  }

  getValue(cell: JQLite): string {
    this._value = cell.html();
    return this._value;
  }

  setValue(cell: JQLite, value: any): boolean {
    cell.html(value);
    return true;
  }
}

class Config {
  static $inject = ['$jexcelEditorProvider'];
  constructor($jexcelEditorProvider: manage.IJExcelEditorProvider) {
    $jexcelEditorProvider.register('equipmentCategory', [
      '$modal',
      '$rootScope',
      ($modal, $rootScope) => new EquipmentCategory($modal, $rootScope)
    ]);
  }
}

cfg.config(Config);
