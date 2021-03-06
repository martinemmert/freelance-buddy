(function (angular) {
  "use strict";

  angular
    .module("app.suppliers")
    .config(['$modelProvider', function ($modelProvider) {
      $modelProvider.register('Supplier', function () {
        return {
          url: 'suppliers',
          fields: ['name'],
          hasMany: [
            {
              relation: 'Spending',
              relationField: 'supplierId',
              relationKey: 'id',
              compositeField: 'spendings'
            }
          ]
        }
      });
    }]);


})(angular);
