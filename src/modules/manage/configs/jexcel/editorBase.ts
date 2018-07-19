export abstract class EditorBase implements jexcel.IEditor {
  protected _value;

  abstract onEdit(cell: JQLite, value: any): ng.IPromise<any>;

  closeEditor(cell: JQLite, save: boolean): string {
    return this._value;
  }

  openEditor(cell: JQLite) {
    var je = $('#' + $.fn.jexcel.current);
    this.onEdit(cell, this._value)
      .then(result => {
        this._value = result;
        je.jexcel('closeEditor', cell, true);
      })
      .catch(() => {
        je.jexcel('closeEditor', cell, false);
      });
  }

  getValue(cell: JQLite): string {
    this._value = cell.html();
    return this._value;
  }

  setValue(cell: JQLite, value: string): boolean {
    cell.html(value);
    return true;
  }
}
