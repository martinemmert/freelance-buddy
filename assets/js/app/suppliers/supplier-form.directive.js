(function (angular) {
  "use strict";

  angular
    .module('app.suppliers')
    .directive('supplierForm', SupplierFormDirective);

  SupplierFormDirective.$inject = ['app.suppliers.TEMPLATE_PATH'];

  function SupplierFormDirective(TEMPLATE_PATH) {

    return {
      restrict: 'E',
      scope: {},
      templateUrl: TEMPLATE_PATH + "supplier-form.tpl.html",
      controller: SupplierFormDirectiveController,
      controllerAs: 'vm',
      bindToController: {
        'supplierModel': "="
      },
      link: postLink
    };

    function postLink(scope) {
      scope.$watch('vm.supplierModel', function (newModel, oldModel, scope) {
        if (newModel) scope.vm.setModel(newModel);
      });
    }
  }

  SupplierFormDirectiveController.$inject = ['SupplierCollection'];

  function SupplierFormDirectiveController(SupplierCollection) {

    var vm = this;

    vm.form = null;
    vm.formData = {};

    vm.setModel = function (model) {
      vm.formData.name = model.name;
    };

    vm.save = function () {
      vm.supplierModel.name = vm.formData.name;
      vm.supplierModel.$save();
      vm.cancel();
    };

    vm.cancel = function () {
      vm.form.$rollbackViewValue();
      vm.form.$setPristine();
      vm.form.$setUntouched();
      vm.supplierModel = null;
    };

    vm.create = function () {
      vm.cancel();
      vm.supplierModel = SupplierCollection.$new();
    };

    if (vm.supplierModel) {
      vm.setModel(vm.supplierModel);
    }
  }

})(angular);
