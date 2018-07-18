import mod = require('modules/manage/module');

class EquipmentCategory implements jexcel.IEditor {
  constructor(private $modal: ng.ui.bootstrap.IModalService) {}
  closeEditor(cell: any, save: any): string {
    return '';
  }
  openEditor(cell: any) {
    this.$modal.open({
      template: 'aaaaaaaa'
    });
  }
  getValue(cell: any): string {
    return '';
  }
  setValue(cell: any, value: any): boolean {
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
