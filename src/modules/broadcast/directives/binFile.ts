import mod = require('modules/broadcast/module');

function directive(): ng.IDirective {
  return {
    replace: true,
    restrict: 'EA',
    template: '<input type="file" />',
    require: '^ngModel',
    link: (
      scope: ng.IScope,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      // var modelPath = instanceAttributes['ngModel'].split('.');

      instanceElement.on('change', e => {
        var file = e.target['files'][0];
        var reader = new FileReader();

        reader['onload'] = function(this: FileReader, ev: ProgressEvent) {
          scope.$emit('$binFileChanged', this.result);
          scope.$apply();
        };

        reader.readAsDataURL(file);
      });
    }
  };
}

mod.directive('binFile', directive);
