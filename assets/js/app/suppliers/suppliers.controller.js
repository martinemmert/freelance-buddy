(function (angular) {
  "use strict";

  angular
    .module("app.suppliers")
    .controller('app.suppliers.controller', SuppliersController);

  SuppliersController.$inject = ['$scope', 'SupplierCollection'];

  function SuppliersController($scope, SupplierCollection) {

    var vm = this;
    vm.supplierCollection = SupplierCollection;
    vm.supplierCollectionLoaded = SupplierCollection.$isLoaded;

    vm.selectModel = function (model) {
      vm.selectedModel = model;
    };

    load();

    function load() {
      SupplierCollection.$query().then(function () {
        vm.supplierCollectionLoaded = SupplierCollection.$isLoaded;
      });
    }

  }

})(angular);
