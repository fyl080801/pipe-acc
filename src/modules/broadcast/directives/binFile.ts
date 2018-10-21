import mod = require('modules/broadcast/module');

function fileLoaded(this: FileReader, ev: ProgressEvent): any {
  console.log(this.result);
}

function directive(): ng.IDirective {
  return {
    replace: true,
    restrict: 'EA',
    template: '<input type="file" />',
    link: (
      scope: any,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      instanceElement.on('change', e => {
        var file = e.target['files'][0];
        var reader = new FileReader();

        reader.onload = fileLoaded;

        reader.readAsDataURL(file);
      });
    }
  };
}

mod.directive('binFile', directive);
