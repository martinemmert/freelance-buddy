(function (angular) {
  "use strict";
  angular
    .module("app.incomes")
    .controller("app.incomes.incomeDetails.controller", IncomeDetailsController);

  IncomeDetailsController.$inject = ['$scope', 'incomeModel'];

  function IncomeDetailsController($scope, incomeModel) {
    var vm = this;
    vm.incomeModel = incomeModel;
  }

})(angular);
