(function (angular) {
  "use strict";

  angular
    .module("app.suppliers")
    .controller('app.suppliers.controller', SuppliersController);

  SuppliersController.$inject = ['$scope', 'supplierCollection'];

  function SuppliersController($scope, supplierCollection) {
    var vm = this;
    vm.supplierCollection = supplierCollection;
  }

})(angular);
