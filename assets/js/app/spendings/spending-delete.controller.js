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
        $state.go('^');
      });
    };

    vm.cancel = function () {
      $state.go("^.details", {spendingId: vm.spendingModel.id});
    }
  }

})(angular);
