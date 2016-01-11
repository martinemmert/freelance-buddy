(function (angular) {
  "use strict";
  angular
    .module("app.suppliers")
    .controller("app.suppliers.supplierDelete.controller", SupplierDeleteController);

  SupplierDeleteController.$inject = ['$scope', '$state', 'supplierModel'];

  function SupplierDeleteController($scope, $state, supplierModel) {
    var vm = this;
    vm.supplierModel = supplierModel;
    vm.delete = function () {
      vm.supplierModel.$delete().then(function () {
        $state.go('^');
        vm.supplierModel = null;
      });
    };

    vm.cancel = function () {
      $state.go("^.details", {supplierId: vm.supplierModel.id});
    }
  }

})(angular);
