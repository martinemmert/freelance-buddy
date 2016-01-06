(function (angular) {
  "use strict";

  angular
    .module('app.incomes')
    .directive('incomeForm', IncomeFormDirective);

  IncomeFormDirective.$inject = ['app.incomes.TEMPLATE_PATH'];

  function IncomeFormDirective(TEMPLATE_PATH) {

    return {
      restrict: 'E',
      scope: {},
      templateUrl: TEMPLATE_PATH + "income-form.tpl.html",
      controller: IncomeFormDirectiveController,
      controllerAs: 'vm',
      bindToController: {
        'incomeModel': "="
      },
      link: postLink
    };

    function postLink(scope) {
      scope.$watch('vm.incomeModel', function (newModel, oldModel, scope) {
        if (newModel) scope.vm.setModel(newModel);
      });
    }
  }

  IncomeFormDirectiveController.$inject = ['IncomeCollection', 'SubprojectCollection'];

  function IncomeFormDirectiveController(IncomeCollection, SubprojectCollection) {

    var vm = this;

    vm.form = null;
    vm.formData = {};
    vm.subprojectCollection = SubprojectCollection;

    vm.setModel = function (model) {

      if (model.$isStored) {
        SubprojectCollection.get(model.subprojectId).then(function (model) {
          vm.formData.selectedSubproject = model;
        });
      } else {
        vm.formData.selectedSubproject = null;
      }

      vm.formData.comment = model.comment;
      vm.formData.invoiceNumber = model.invoiceNumber;
      vm.formData.payedOn = model.payedOn ? new Date(model.payedOn) : new Date();
      vm.formData.netTotal = model.netTotal;
      vm.formData.taxValue = model.taxValue;
      vm.formData.taxFree = model.taxFree;
    };

    vm.save = function () {
      vm.incomeModel.subprojectId = vm.formData.selectedSubproject.id;
      vm.incomeModel.comment = vm.formData.comment;
      vm.incomeModel.invoiceNumber = vm.formData.invoiceNumber;
      vm.incomeModel.payedOn = vm.formData.payedOn;
      vm.incomeModel.netTotal = vm.formData.netTotal;
      vm.incomeModel.taxValue = vm.formData.taxValue;
      vm.incomeModel.taxFree = vm.formData.taxFree;
      vm.incomeModel.$save();
      vm.cancel();
    };

    vm.cancel = function () {
      vm.form.$rollbackViewValue();
      vm.form.$setPristine();
      vm.form.$setUntouched();
      vm.incomeModel = null;
    };

    vm.create = function () {
      vm.cancel();
      vm.incomeModel = IncomeCollection.$new();
    };

    if (vm.incomeModel) {
      vm.setModel(vm.incomeModel);
    }
  }

})(angular);
