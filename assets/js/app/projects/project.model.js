(function (angular) {
  "use strict";

  angular
    .module('app.projects')
    .config(['$modelProvider', function ($modelProvider) {
      $modelProvider.register('Project', function () {
        return {
          url: 'projects',
          fields: ['customerId', 'title', 'projectNumber'],
          belongsTo: [
            {
              relation: 'Customer',
              relationField: 'customerId',
              compositeField: 'customer'
            }
          ],
          hasMany: [
            {
              relation: 'Subproject',
              relationField: 'projectId',
              relationKey: 'id',
              compositeField: 'subprojects'
            }
          ],
          composed: {
            'labelText': {
              get: function () {
                return this.projectNumber + "-" + this.title;
              }
            }
          }
        }
      });
    }]);

})(angular);
