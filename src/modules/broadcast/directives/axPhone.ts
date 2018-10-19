import mod = require('modules/broadcast/module');

class Controller {
  static $inject = ['$scope', '$element'];
  constructor(private $scope, private $element: JQLite) {}
}

function directive(): ng.IDirective {
  return {
    restrict: 'EA',
    replace: true,
    template:
      '<object id="AxPhone" CLASSID="CLSID:221F2644-4292-4F48-9236-9A6A998FFEB2"><param name="BackColor" value="0" /></object>',
    controller: Controller
  };
}

mod.directive('axPhone', directive);
