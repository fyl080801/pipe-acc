import mod = require('modules/common/module');

mod.factory('modules/common/extend/table/ngTableGetDataBcShim', [
  '$q',
  function($q) {
    return createWrapper;

    function createWrapper(getDataFn) {
      return (...args) => {
        var $defer = $q.defer();
        var pData = getDataFn.apply(
          this,
          [$defer].concat(Array.prototype.slice.call(args))
        );
        if (!pData) {
          // If getData resolved the $defer, and didn't promise us data,
          //   create a promise from the $defer. We need to return a promise.
          pData = $defer.promise;
        }
        return pData;
      };
    }
  }
]);
