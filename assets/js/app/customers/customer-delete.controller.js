(function (angular) {
  "use strict";
  angular
    .module("app.customers")
    .controller("app.customers.customerDelete.controller", CustomerDeleteController);

  CustomerDeleteController.$inject = ['$scope', '$state', 'customerModel'];

  function CustomerDeleteController($scope, $state, customerModel) {
    var vm = this;
    vm.customerModel = customerModel;
    vm.delete = function () {
      vm.customerModel.$delete().then(function () {
        $state.go('^');
        vm.customerModel = null;
      });
    };

    vm.cancel = function () {
      $state.go("^.details", {customerId: vm.customerModel.id});
    }
  }

})(angular);
