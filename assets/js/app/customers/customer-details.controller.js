(function (angular) {
  "use strict";
  angular
    .module("app.customers")
    .controller("app.customers.customerDetails.controller", CustomerDetailsController);

  CustomerDetailsController.$inject = ['$scope', 'customerModel'];

  function CustomerDetailsController($scope, customerModel) {
    var vm = this;
    vm.customerModel = customerModel;
  }

})(angular);
