(function (angular) {
  "use strict";

  angular
    .module("app.spendings")
    .controller('app.spendings.controller', SpendingsController);

  SpendingsController.$inject = ['$scope', '$state', 'spendingCollection'];

  function SpendingsController($scope, $state, spendingCollection) {
    var vm = this;
    vm.spendingCollection = spendingCollection;
    vm.openDetails = function (obj) {
      $state.go('spendings.spending.edit', obj);
    };
  }

})(angular);
