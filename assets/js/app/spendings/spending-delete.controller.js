(function (angular) {
  "use strict";
  angular
    .module("app.spendings")
    .controller("app.spendings.spendingDelete.controller", SpendingDeleteController);

  SpendingDeleteController.$inject = ['$scope', '$state', 'spendingModel'];

  function SpendingDeleteController($scope, $state, spendingModel) {
    var vm = this;
    vm.spendingModel = spendingModel;

    vm.delete = function () {
      vm.spendingModel.$delete().then(function () {
        vm.spendingModel = null;
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
