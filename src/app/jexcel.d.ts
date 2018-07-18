/// <reference types="jquery"/>

declare namespace jexcel {
  interface IJExcelStatic {
    current: string;
  }

  interface IJExcel {
    init(options?: IJExcelOptions);
    prepareTable(id: string);
    setData(data: any, ignoreSpare?: boolean);
    updateSettings(options?: IJExcelOptions);
    openEditor(cell, empty);
    closeEditor(cell, save);
    getCell(cell): ICell;
    getValue(cell): any;
    setValue(cell, value, force);
    loadCells(cells, force);
    updateCells(cells, force);
    updateCell(v, force);
    updateSelection(o, d, origin);
    resetSelection();
    getSelection(): any[];
    getCellCursor(): object;
    getSelectedCells(): any;
    updateCornerSelection(current): void;
    updateCornerPosition(): void;
    getData(highlighted: number): string;
    getRowData(rowNumber: number): any[];
    getColumnData(columnNumber: number): any[];
    copy(highlighted: boolean, delimiter: any, returnData: string): string;
    cut();
    paste(cell, data): string;
    insertColumn(mixed: number, properties: object, columnNumber: number);
    insertRow(mixed: number, rowNumber: number): void;
    deleteColumn(columnNumber: number, numOfColumns: number): void;
    deleteRow(rowNumber: number, numOfRows: number): void;
    setWidth(column: number, width: number);
    getWidth(column: number): number;
    getHeader(column: number): string;
    getHeaders(convertToText: boolean): string[];
    setHeader(column: number, title: string);
  }

  interface IColumnOptions {
    format: string;
  }

  interface IEditor {
    closeEditor(cell, save): string;
    openEditor(cell);
    getValue(cell): string;
    setValue(cell, value): boolean;
  }

  interface ICell {}

  interface IColumn {
    type: string;
    readOnly: boolean;
    wordWrap: boolean;
    cssClass: string;
    source: any;
    allowEmpty: boolean;
    url: string;
    editor: IEditor;
    options: any;
  }

  interface IJExcelOptions {
    // External data
    url: string;
    // Data
    data: object[][];
    // Column types and configurations
    colHeaders?: string[];
    //
    columns?: IColumn[];
    // Column width sizes
    colWidths: string[] | number[];
    // Column alignment
    colAlignments: string[];
    // Colum header classes
    colHeaderClasses: string[];
    // Column width that is used by default
    defaultColWidth: number;
    // Minimal number of blank rows in the end
    minSpareRows: number;
    // Minimal number of blank cols in the end
    minSpareCols: number;
    // Minimal table dimensions
    minDimensions: number[];
    // Custom context menu
    contextMenu: any;
    // Allow column sorting
    columnSorting: boolean;
    // Allow column resizing
    columnResize: boolean;
    // Allow row dragging
    rowDrag: boolean;
    // Allow table edition
    editable: boolean;
    // Allow new rows
    allowInsertRow: boolean;
    // Allow new rows
    allowManualInsertRow: boolean;
    // Allow new columns
    allowInsertColumn: boolean;
    // Allow new rows
    allowManualInsertColumn: boolean;
    // Allow row delete
    allowDeleteRow: boolean;
    // Allow column delete
    allowDeleteColumn: boolean;
    // Global wrap
    wordWrap: boolean;
    // CSV source
    csv: any;
    // Filename
    csvFileName: string;
    // CSV headers
    csvHeaders: boolean;
    // Delimiters
    csvDelimiter: string;
    // Disable corner selection
    selectionCopy: boolean;
    // Allow Overflow
    tableOverflow: boolean;
    // Allow Overflow
    tableHeight: string;
    // History
    history: any[];
    // HistoryIndex
    historyIndex: number;
  }
}

interface JQuery {
  jexcel(options?: jexcel.IJExcelOptions): jexcel.IJExcel;
  jexcel(command: string, element: JQuery<HTMLElement>, boolean);
}

declare namespace $ {
  interface fn {
    jexcel: jexcel.IJExcelStatic;
  }
}

// interface JQuery<TElement extends Node = HTMLElement>
//   extends Iterable<TElement> {
//   jexcel(options?: jexcel.IJExcelOptions): void;
// }
