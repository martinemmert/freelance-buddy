(function (angular) {
  "use strict";

  angular
    .module("app.customers")
    .config(['$modelProvider', function ($modelProvider) {
      $modelProvider.register('Customer', function () {
        return {
          url: 'customers',
          fields: ['name', 'abbreviation'],
          hasMany: {
            relation: 'Project',
            compositeField: 'projects',
            relationField: 'customerId',
            relationKey: 'id'
          },
          composed: {
            'labelText': {
              get: function () {
                return "[" + this.abbreviation + "] " + this.name;
              }
            }
          }
        }
      });
    }]);


})(angular);
