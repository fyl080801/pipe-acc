import mod = require('modules/acc/module');
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

  private _options;
  constructor(
    private $location,
    private ngTableParams,
    private requestService,
    private initOptions
  ) {
    this._options = {};

    this.options(initOptions);

    return this;
  }

  options(newOptions) {
    if (angular.isDefined(newOptions)) {
      angular.extend(this._options, newOptions);
    }
    return self;
  }

  table(newParams, newSettings) {
    return new this.ngTableParams(
      newParams,
      $.extend(newSettings, {
        getData: params => {
          return this.getData(params, this._options);
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
  'modules/acc/extend/table/ngTableParams',
  'modules/acc/services/requestService'
];

mod.factory('modules/acc/factories/ngTableRequest', factory);
