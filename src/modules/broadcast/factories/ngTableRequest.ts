import mod = require('modules/broadcast/module');
import angular = require('angular');

class Factory {
  private getData(params, requestOptions) {
    var currentOptions = $.extend({}, requestOptions);
    var query = this.$location.search(currentOptions.url);
    var url = currentOptions.url.split(/[&?]/)[0];

    var queryArray = [];
    for (var n in query) {
      queryArray.push(n + '=' + query[n]);
    }

    queryArray.push('queryId=' + url);
    queryArray.push('pageName=user_list'); // 不知道干什么用的
    queryArray.push('pageInfo[pageSize]=' + params.count());
    queryArray.push('pageInfo[pageNum]=' + params.page());

    var orderBy = params.orderBy();
    if (orderBy.length > 0) {
      queryArray.push(
        'sortInfo=' +
          orderBy[0].substring(1) +
          '+' +
          (orderBy[0][0] === '+' ? 'asc' : 'desc')
      );
    }

    for (var i = 0; i < currentOptions.conditions.length; i++) {
      if (
        currentOptions.conditions[i].value &&
        currentOptions.conditions[i].value !== ''
      ) {
        queryArray.push(
          'conditions[' + i + '][key]=' + currentOptions.conditions[i].key
        );
        queryArray.push(
          'conditions[' +
            i +
            '][value]=%' +
            currentOptions.conditions[i].value +
            '%'
        );
        queryArray.push('conditions[' + i + '][isCondition]=true');
      }
    }

    var urlString = [url, queryArray.join('&')].join('?');

    return this.requestService
      .url(urlString)
      .options(currentOptions)
      .get()
      .result.then(result => {
        if (result && result.totalPages) params.total(result.totalPages);
        return result.data;
      })
      .catch(() => {
        params.total(0);
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

mod.factory('modules/broadcast/factories/ngTableRequest', factory);
