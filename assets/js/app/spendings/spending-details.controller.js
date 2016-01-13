(function (angular) {
  "use strict";
  angular
    .module("app.spendings")
    .controller("app.spendings.spendingDetails.controller", SpendingDetailsController);

  SpendingDetailsController.$inject = ['$scope', 'spendingModel'];

  function SpendingDetailsController($scope, spendingModel) {
    var vm = this;
    vm.spendingModel = spendingModel;
  }

})(angular);
