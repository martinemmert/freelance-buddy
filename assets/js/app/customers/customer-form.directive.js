(function (angular) {
  "use strict";

  angular
    .module('app.customers')
    .directive('customerForm', CustomerFormDirective);

  CustomerFormDirective.$inject = ['app.customers.TEMPLATE_PATH'];

  function CustomerFormDirective(TEMPLATE_PATH) {

    return {
      restrict: 'E',
      scope: {},
      templateUrl: TEMPLATE_PATH + "customer-form.tpl.html",
      controller: CustomerFormDirectiveController,
      controllerAs: 'vm',
      bindToController: {
        'customerModel': "="
      },
      link: postLink
    };

    function postLink(scope) {
      scope.$watch('vm.customerModel', function (newModel, oldModel, scope) {
        if (newModel) scope.vm.setModel(newModel);
      });
    }
  }

  CustomerFormDirectiveController.$inject = ['CustomerCollection'];

  function CustomerFormDirectiveController(CustomerCollection) {

    var vm = this;

    vm.form = null;
    vm.formData = {};

    vm.setModel = function (model) {
      vm.formData.name = model.name;
      vm.formData.abbreviation = model.abbreviation;
    };

    vm.save = function () {
      vm.customerModel.name = vm.formData.name;
      vm.customerModel.abbreviation = vm.formData.abbreviation;
      vm.customerModel.$save();
      vm.cancel();
    };

    vm.cancel = function () {
      vm.form.$rollbackViewValue();
      vm.form.$setPristine();
      vm.form.$setUntouched();
      vm.customerModel = null;
    };

    vm.create = function () {
      vm.cancel();
      vm.customerModel = CustomerCollection.$new();
    };

    if (vm.customerModel) {
      vm.setModel(vm.customerModel);
    }
  }

})(angular);
