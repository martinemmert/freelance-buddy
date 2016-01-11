(function (angular) {
  "use strict";

  angular
    .module("app.customers")
    .controller('app.customers.controller', CustomersController);

  // customerCollection will be injected via UI-Router State
  CustomersController.$inject = ['$scope', 'customerCollection'];

  function CustomersController($scope, customerCollection) {
    var vm = this;
    vm.customersCollection = customerCollection;
    vm.customersCollectionLoaded = customerCollection.$isLoaded;
  }

})(angular);
