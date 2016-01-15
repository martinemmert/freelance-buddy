(function (angular) {
  "use strict";

  angular
    .module("app.incomes")
    .controller('app.incomes.controller', IncomesController);

  IncomesController.$inject = ['$scope', '$state', 'incomeCollection'];

  function IncomesController($scope, $state, incomeCollection) {
    var vm = this;
    vm.incomeCollection = incomeCollection;
    vm.openDetails = function (obj) {
      $state.go('incomes.income.edit', obj);
    };
  }

})(angular);
