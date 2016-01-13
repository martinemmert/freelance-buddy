(function (angular) {
  "use strict";
  angular
    .module("app.incomes")
    .controller("app.incomes.incomeEdit.controller", IncomeEditController);

  IncomeEditController.$inject = ['$scope', '$state', 'incomeModel', 'subprojectCollection'];

  function IncomeEditController($scope, $state, incomeModel, subprojectCollection) {
    var vm = this;

    vm.form = null;
    vm.formData = {};
    vm.incomeModel = incomeModel;
    vm.subprojectCollection = subprojectCollection;

    if (incomeModel.$isStored) {
      subprojectCollection.get(incomeModel.subprojectId).then(function (model) {
        vm.formData.selectedSubproject = model;
      });
      vm.formData.comment = incomeModel.comment;
      vm.formData.invoiceNumber = incomeModel.invoiceNumber;
      vm.formData.payedOn = incomeModel.payedOn ? new Date(incomeModel.payedOn) : new Date();
      vm.formData.netTotal = incomeModel.netTotal;
      vm.formData.taxValue = incomeModel.taxValue;
      vm.formData.taxFree = incomeModel.taxFree;
    } else {
      vm.formData.selectedSupplier = null;
    }

    vm.save = function () {
      vm.incomeModel.subprojectId = vm.formData.selectedSubproject.id;
      vm.incomeModel.comment = vm.formData.comment;
      vm.incomeModel.invoiceNumber = vm.formData.invoiceNumber;
      vm.incomeModel.payedOn = vm.formData.payedOn;
      vm.incomeModel.netTotal = vm.formData.netTotal;
      vm.incomeModel.taxValue = vm.formData.taxValue;
      vm.incomeModel.taxFree = vm.formData.taxFree;
      vm.incomeModel.$save().then(function (model) {
        $state.go('^.details', {incomeId: model.id});
      });
    };

    vm.cancel = function () {
      if (vm.incomeModel.$isStored) {
        $state.go('^.details', {incomeId: vm.incomeModel.id});
      } else {
        $state.go('^');
      }
    };
  }

})(angular);
