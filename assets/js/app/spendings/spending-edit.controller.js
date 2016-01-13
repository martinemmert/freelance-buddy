(function (angular) {
  "use strict";
  angular
    .module("app.spendings")
    .controller("app.spendings.spendingEdit.controller", SpendingEditController);

  SpendingEditController.$inject = ['$scope', '$state', 'spendingModel', 'supplierCollection'];

  function SpendingEditController($scope, $state, spendingModel, supplierCollection) {
    var vm = this;

    vm.form = null;
    vm.formData = {};
    vm.spendingModel = spendingModel;
    vm.supplierCollection = supplierCollection;

    if (spendingModel.$isStored) {
      supplierCollection.get(spendingModel.supplierId).then(function (model) {
        vm.formData.selectedSupplier = model;
      });
      vm.formData.comment = spendingModel.comment;
      vm.formData.invoiceNumber = spendingModel.invoiceNumber;
      vm.formData.payedOn = spendingModel.payedOn ? new Date(spendingModel.payedOn) : new Date();
      vm.formData.netTotal = spendingModel.netTotal;
      vm.formData.taxValue = spendingModel.taxValue;
      vm.formData.taxFree = spendingModel.taxFree;
    } else {
      vm.formData.selectedSupplier = null;
    }

    vm.save = function () {
      vm.spendingModel.supplierId = vm.formData.selectedSupplier.id;
      vm.spendingModel.comment = vm.formData.comment;
      vm.spendingModel.invoiceNumber = vm.formData.invoiceNumber;
      vm.spendingModel.payedOn = vm.formData.payedOn;
      vm.spendingModel.netTotal = vm.formData.netTotal;
      vm.spendingModel.taxValue = vm.formData.taxValue;
      vm.spendingModel.taxFree = vm.formData.taxFree;
      vm.spendingModel.$save().then(function (model) {
        $state.go('^.details', {spendingId: model.id});
      });
    };

    vm.cancel = function () {
      if (vm.spendingModel.$isStored) {
        $state.go('^.details', {spendingId: vm.spendingModel.id});
      } else {
        $state.go('^');
      }
    };
  }

})(angular);
