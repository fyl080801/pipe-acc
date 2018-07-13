import mod = require('modules/acc/module');
import '../../../../bower_components/jquery.nicescroll/dist/jquery.nicescroll.min';

function directive(): ng.IDirective {
  return {
    link: (scope, instanceElement: JQLite) => {
      instanceElement.niceScroll();
    }
  };
}

mod.directive('nicescroll', directive);
