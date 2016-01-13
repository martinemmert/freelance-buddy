(function (angular) {
  "use strict";

  angular
    .module("app.incomes")
    .controller('app.incomes.controller', IncomesController);

  IncomesController.$inject = ['$scope', 'incomeCollection'];

  function IncomesController($scope, incomeCollection) {
    var vm = this;
    vm.incomeCollection = incomeCollection;
  }

})(angular);
