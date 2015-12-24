(function (angular) {
  "use strict";

  angular
    .module('app.subprojects')
    .config(['$modelProvider', function ($modelProvider) {
      $modelProvider.register('Subproject', function () {
        return {
          url: 'subprojects',
          fields: ['projectId', 'title', 'projectNumber'],
          belongsTo: {
            relation: 'Project',
            relationField: 'projectId',
            compositeField: 'project'
          },
          composed: {}
        }
      });
    }]);

})(angular);
