import mod = require('modules/common/module');
import angular = require('angular');

let defaults: common.table.INgTableColumn = {
  class: () => {
    return '';
  },
  //filterData: angular.noop,
  headerTemplateURL: () => {
    return false;
  },
  headerTitle: () => {
    return '';
  },
  sortable: () => {
    return false;
  },
  show: () => {
    return true;
  },
  title: () => {
    return '';
  },
  titleAlt: () => {
    return '';
  }
};

function ngTableColumnFactory() {
  /**
   * @ngdoc method
   * @name ngTableColumn#buildColumn
   * @description Creates a $column for use within a header template
   *
   * @param {Object} column an existing $column or simple column data object
   * @param {Scope} defaultScope the $scope to supply to the $column getter methods when not supplied by caller
   * @returns {Object} a $column object
   */
  function buildColumn(column, defaultScope) {
    // note: we're not modifying the original column object. This helps to avoid unintended side affects
    var extendedCol = Object.create(column);
    for (var prop in defaults) {
      if (extendedCol[prop] === undefined) {
        extendedCol[prop] = defaults[prop];
      }
      if (!angular.isFunction(extendedCol[prop])) {
        // wrap raw field values with "getter" functions
        // - this is to ensure consistency with how ngTable.compile builds columns
        // - note that the original column object is being "proxied"; this is important
        //   as it ensure that any changes to the original object will be returned by the "getter"
        (prop1 => {
          extendedCol[prop1] = () => {
            return column[prop1];
          };
        })(prop);
      }
      (function(prop1) {
        // satisfy the arguments expected by the function returned by parsedAttribute in the ngTable directive
        var getterFn = extendedCol[prop1];
        extendedCol[prop1] = (...args) => {
          if (args.length === 0) {
            return getterFn.call(column, defaultScope);
          } else {
            return getterFn.apply(column, args);
          }
        };
      })(prop);
    }
    return extendedCol;
  }

  return {
    buildColumn: buildColumn
  };
}

mod.factory('modules/common/extend/table/ngTableColumn', ngTableColumnFactory);
