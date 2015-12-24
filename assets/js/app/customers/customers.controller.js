(function (angular) {
  "use strict";

  angular
    .module("app.customers")
    .controller('app.customers.controller', CustomersController);

  CustomersController.$inject = ['$scope', 'CustomerCollection'];

  function CustomersController($scope, CustomerCollection) {

    var vm = this;
    vm.customersCollection = CustomerCollection;
    vm.customersCollectionLoaded = CustomerCollection.$isLoaded;

    vm.selectModel = function (model) {
      vm.selectedModel = model;
    };

    load();

    function load() {
      CustomerCollection.$query().then(function () {
        vm.customersCollectionLoaded = CustomerCollection.$isLoaded;
      });
    }

  }

})(angular);
