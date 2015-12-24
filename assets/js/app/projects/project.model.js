(function (angular) {
  "use strict";

  angular
    .module('app.projects')
    .config(['$modelProvider', function ($modelProvider) {
      $modelProvider.register('Project', ['CustomerCollection', function (CustomerCollection) {
        return {
          url: 'projects',
          fields: ['customerId', 'title', 'projectNumber'],
          belongsTo: {
            relation: 'Customer',
            relationField: 'customerId',
            compositeField: 'customer'
          },
          composed: {}
        }
      }]);
    }]);

})(angular);
