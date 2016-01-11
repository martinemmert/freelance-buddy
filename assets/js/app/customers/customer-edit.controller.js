(function (angular) {
  "use strict";
  angular
    .module("app.customers")
    .controller("app.customers.customerEdit.controller", CustomerEditController);

  CustomerEditController.$inject = ['$scope', '$state', 'customerModel'];

  function CustomerEditController($scope, $state, customerModel) {
    var vm = this;

    vm.customerModel = customerModel;
    vm.form = null;
    vm.formData = {};

    if (customerModel.$isStored) {
      vm.formData.name = customerModel.name;
      vm.formData.abbreviation = customerModel.abbreviation;
    }

    vm.save = function () {
      vm.customerModel.name = vm.formData.name;
      vm.customerModel.abbreviation = vm.formData.abbreviation;
      vm.customerModel.$save().then(function (model) {
        $state.go('^.details', {customerId: model.id});
      });
    };

    vm.cancel = function () {
      if (vm.customerModel.$isStored) {
        $state.go('^.details', {customerId: vm.customerModel.id});
      } else {
        $state.go('^');
      }
    };
  }

})(angular);
