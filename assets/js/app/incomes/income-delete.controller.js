(function (angular) {
  "use strict";
  angular
    .module("app.incomes")
    .controller("app.incomes.incomeDelete.controller", IncomeDeleteController);

  IncomeDeleteController.$inject = ['$scope', '$state', 'incomeModel'];

  function IncomeDeleteController($scope, $state, incomeModel) {
    var vm = this;
    vm.incomeModel = incomeModel;

    vm.delete = function () {
      vm.incomeModel.$delete().then(function () {
        vm.incomeModel = null;
        $state.go('^.^');
      });
    };

    vm.tryDelete = function () {
      $scope.showDeleteOptions = true;
    };

    vm.cancel = function () {
      $scope.showDeleteOptions = false;
    };

    // make this visible
    $scope.deleteVisible = true;
    $scope.showDeleteOptions = false;
  }

})(angular);
