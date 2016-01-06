(function (angular) {
  "use strict";

  angular
    .module('app.spendings')
    .directive('spendingForm', SpendingFormDirective);

  SpendingFormDirective.$inject = ['app.spendings.TEMPLATE_PATH'];

  function SpendingFormDirective(TEMPLATE_PATH) {

    return {
      restrict: 'E',
      scope: {},
      templateUrl: TEMPLATE_PATH + "spending-form.tpl.html",
      controller: SpendingFormDirectiveController,
      controllerAs: 'vm',
      bindToController: {
        'spendingModel': "="
      },
      link: postLink
    };

    function postLink(scope) {
      scope.$watch('vm.spendingModel', function (newModel, oldModel, scope) {
        if (newModel) scope.vm.setModel(newModel);
      });
    }
  }

  SpendingFormDirectiveController.$inject = ['SpendingCollection', 'SupplierCollection'];

  function SpendingFormDirectiveController(SpendingCollection, SupplierCollection) {

    var vm = this;

    vm.form = null;
    vm.formData = {};
    vm.supplierCollection = SupplierCollection;

    vm.setModel = function (model) {

      if (model.$isStored) {
        SupplierCollection.get(model.supplierId).then(function (model) {
          vm.formData.selectedSupplier = model;
        });
      } else {
        vm.formData.selectedSupplier = null;
      }

      vm.formData.comment = model.comment;
      vm.formData.invoiceNumber = model.invoiceNumber;
      vm.formData.payedOn = model.payedOn ? new Date(model.payedOn) : new Date();
      vm.formData.netTotal = model.netTotal;
      vm.formData.taxValue = model.taxValue;
      vm.formData.taxFree = model.taxFree;
    };

    vm.save = function () {
      vm.spendingModel.supplierId = vm.formData.selectedSupplier.id;
      vm.spendingModel.comment = vm.formData.comment;
      vm.spendingModel.invoiceNumber = vm.formData.invoiceNumber;
      vm.spendingModel.payedOn = vm.formData.payedOn;
      vm.spendingModel.netTotal = vm.formData.netTotal;
      vm.spendingModel.taxValue = vm.formData.taxValue;
      vm.spendingModel.taxFree = vm.formData.taxFree;
      vm.spendingModel.$save();
      vm.cancel();
    };

    vm.cancel = function () {
      vm.form.$rollbackViewValue();
      vm.form.$setPristine();
      vm.form.$setUntouched();
      vm.spendingModel = null;
    };

    vm.create = function () {
      vm.cancel();
      vm.spendingModel = SpendingCollection.$new();
    };

    if (vm.spendingModel) {
      vm.setModel(vm.spendingModel);
    }
  }

})(angular);
