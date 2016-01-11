(function (angular) {
  "use strict";
  angular
    .module("app.suppliers")
    .controller("app.suppliers.supplierDetails.controller", SupplierDetailsController);

  SupplierDetailsController.$inject = ['$scope', 'supplierModel'];

  function SupplierDetailsController($scope, supplierModel) {
    var vm = this;
    vm.supplierModel = supplierModel;
  }

})(angular);
