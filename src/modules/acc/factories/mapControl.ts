import mod = require('modules/acc/module');
import angular = require('angular');
import L = require('leaflet');

function factory(
  $compile: ng.ICompileService,
  $rootScope: ng.IRootScopeService,
  $controller,
  $q,
  $http,
  $templateCache,
  $injector
) {
  function getTemplatePromise(options) {
    return options.template
      ? $q.when(options.template)
      : $http
          .get(
            angular.isFunction(options.templateUrl)
              ? options.templateUrl()
              : options.templateUrl,
            { cache: $templateCache }
          )
          .then(function(result) {
            return result.data;
          });
  }

  function getResolvePromises(resolves) {
    var promisesArr = [];
    angular.forEach(resolves, function(value) {
      if (angular.isFunction(value) || angular.isArray(value)) {
        promisesArr.push($q.when($injector.invoke(value)));
      }
    });
    return promisesArr;
  }

  return (controlOptions: acc.IMapControlOptions) => {
    var controlElm = L.DomUtil.create('div', 'leaflet-control-clegend');

    var templateAndResolvePromise = $q.all(
      [getTemplatePromise(controlOptions)].concat(
        getResolvePromises(controlOptions.resolve)
      )
    );

    templateAndResolvePromise.then(tplAndVars => {
      var controlScope = (controlOptions.scope || $rootScope).$new();

      //
      if (controlOptions.controller) {
        var ctrlInstance,
          ctrlLocals = {
            $scope: controlScope
          };
        var resolveIter = 1;

        angular.forEach(controlOptions.resolve, (value, key) => {
          ctrlLocals[key] = tplAndVars[resolveIter++];
        });

        ctrlInstance = $controller(controlOptions.controller, ctrlLocals);
        if (controlOptions.controllerAs) {
          controlScope[controlOptions.controllerAs] = ctrlInstance;
        }
      }

      //
      var angularDomEl = angular.element('<div></div>');

      angularDomEl.attr('template-url', controlOptions.templateUrl);
      angularDomEl.html(tplAndVars[0]);
      controlElm.appendChild(angularDomEl.get(0));

      $compile(controlElm)(controlScope);
    });

    var t = L.Control.extend({
      options: {
        position: 'topright'
      },
      initialize: options => {
        L.Util.extend(this.options, options);
      },
      onAdd: function(map: L.Map) {
        this._container = controlElm;

        return this._container;
      }
    });

    return new t(controlOptions.options);
  };
}

factory.$inject = [
  '$compile',
  '$rootScope',
  '$controller',
  '$q',
  '$http',
  '$templateCache',
  '$injector'
];

mod.factory('modules/acc/factories/mapControl', factory);
