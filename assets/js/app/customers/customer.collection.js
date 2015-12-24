(function (angular) {
  "use strict";

  angular
    .module("app.customers")
    .config(['$collectionProvider', function ($collectionProvider) {
      $collectionProvider.register('Customer', CustomerCollectionProvider);
    }]);

  CustomerCollectionProvider.$inject = ['CustomerModel'];

  function CustomerCollectionProvider(CustomerModel) {
    return {
      model: CustomerModel
    }
  }


})(angular);
