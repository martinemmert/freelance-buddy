(function (angular) {
  "use strict";

  angular
    .module("app.spendings")
    .controller('app.spendings.controller', SpendingsController);

  SpendingsController.$inject = ['$scope', 'spendingCollection'];

  function SpendingsController($scope, spendingCollection) {
    var vm = this;
    vm.spendingCollection = spendingCollection;
  }

})(angular);
