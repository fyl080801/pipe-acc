import mod = require('modules/manage/module');

class EquipmentCategory implements jexcel.IEditor {
  private _value;

  constructor(private $modal: ng.ui.bootstrap.IModalService) {}
  closeEditor(cell: JQLite, save: boolean): string {
    return this._value;
  }
  openEditor(cell: JQLite) {
    this.$modal
      .open({
        template:
          '<div><input ng-model="xxx"><a href="" ng-click="$close(xxx)">aaaaa</a></div>'
      })
      .result.then(result => {
        this._value = result;
        $('#' + $.fn.jexcel.current).jexcel('closeEditor', cell, true);
      });
  }
  getValue(cell: JQLite): string {
    return cell.html();
  }
  setValue(cell: JQLite, value: any): boolean {
    cell.html(value);
    return true;
  }
}

function factory($modal: ng.ui.bootstrap.IModalService): () => jexcel.IEditor {
  var editor = () => {
    return new EquipmentCategory($modal);
  };
  return editor;
}

factory.$inject = ['$modal'];

mod.factory('modules/manage/factories/jexcel/equipmentCategory', factory);
