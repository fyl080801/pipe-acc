import mod = require('modules/common/module');
import angular = require('angular');

class Factory {
  private getData(params, requestOptions) {
    var query = this.$location.search(requestOptions.url);
    var url = requestOptions.url.split(/[&?]/)[0];

    query.page = params.page();
    query.count = params.count();
    var queryArray = [];
    for (var n in query) {
      queryArray.push(n + '=' + query[n]);
    }
    var urlString = [url, queryArray.join('&')].join('?');
    return this.requestService
      .url(urlString)
      .options(requestOptions)
      .post($.extend({}, requestOptions.data))
      .result.then(result => {
        if (result && result.total) params.total(result.total);
        return result.list;
      })
      .catch(() => {
        return [];
      });
  }

  constructor(
    private $location,
    private ngTableParams,
    private requestService,
    private initOptions
  ) {
    this.initOptions = this.initOptions || {};

    return this;
  }

  options(newOptions) {
    if (angular.isDefined(newOptions)) {
      angular.extend(this.initOptions, newOptions);
    }
    return this;
  }

  table(newParams?, newSettings?) {
    return new this.ngTableParams(
      newParams,
      $.extend(newSettings, {
        getData: params => {
          return this.getData(params, this.initOptions);
        }
      })
    );
  }
}

function factory($location, ngTableParams, requestService) {
  return options => {
    return new Factory($location, ngTableParams, requestService, options);
  };
}

factory.$inject = [
  '$location',
  'modules/common/extend/table/ngTableParams',
  'modules/common/services/requestService'
];

mod.factory('modules/common/factories/ngTableRequest', factory);
