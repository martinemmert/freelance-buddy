(function (angular) {
  "use strict";
  angular
    .module("app.suppliers")
    .controller("app.suppliers.supplierEdit.controller", CustomerEditController);

  CustomerEditController.$inject = ['$scope', '$state', 'supplierModel'];

  function CustomerEditController($scope, $state, supplierModel) {
    var vm = this;

    vm.supplierModel = supplierModel;
    vm.form = null;
    vm.formData = {};

    if (supplierModel.$isStored) {
      vm.formData.name = supplierModel.name;
    }

    vm.save = function () {
      vm.supplierModel.name = vm.formData.name;
      vm.supplierModel.$save().then(function (model) {
        $state.go('^.details', {supplierId: model.id});
      });
    };

    vm.cancel = function () {
      if (vm.supplierModel.$isStored) {
        $state.go('^.details', {supplierId: vm.supplierModel.id});
      } else {
        $state.go('^');
      }
    };
  }

})(angular);
