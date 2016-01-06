(function (angular) {
  "use strict";

  angular
    .module("app.suppliers")
    .config(['$collectionProvider', function ($collectionProvider) {
      $collectionProvider.register('Supplier', SupplierCollectionProvider);
    }]);

  SupplierCollectionProvider.$inject = ['SupplierModel'];

  function SupplierCollectionProvider(SupplierModel) {
    return {
      model: SupplierModel
    }
  }


})(angular);
