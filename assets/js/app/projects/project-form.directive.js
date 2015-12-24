(function (angular) {
  "use strict";

  angular
    .module('app.projects')
    .directive('projectForm', ProjectFormDirective);

  ProjectFormDirective.$inject = ['app.projects.TEMPLATE_PATH'];

  function ProjectFormDirective(TEMPLATE_PATH) {

    return {
      restrict: 'E',
      scope: {},
      templateUrl: TEMPLATE_PATH + "project-form.tpl.html",
      controller: ProjectFormDirectiveController,
      controllerAs: 'vm',
      bindToController: {
        'projectModel': "="
      },
      link: postLink
    };

    function postLink(scope) {
      scope.$watch('vm.projectModel', function (newModel, oldModel, scope) {
        if (newModel) scope.vm.setModel(newModel);
      });
    }
  }

  ProjectFormDirectiveController.$inject = ['ProjectCollection', 'CustomerCollection'];

  function ProjectFormDirectiveController(ProjectCollection, CustomerCollection) {

    var vm = this;

    vm.form = null;
    vm.formData = {};
    vm.customerCollection = CustomerCollection;

    CustomerCollection.$query().then(function (collection) {
      return collection;
    });

    vm.setModel = function (model) {
      console.log(model);
      if (model.$isStored) {
        CustomerCollection.get(model.customerId).then(function (model) {
          vm.formData.selectedCustomer = model;
        });
      } else {
        vm.formData.selectedCustomer = null;
      }
      vm.formData.title = model.title;
      vm.formData.projectNumber = model.projectNumber;
    };

    vm.save = function () {
      vm.projectModel.customerId = vm.formData.selectedCustomer.id;
      vm.projectModel.title = vm.formData.title;
      vm.projectModel.projectNumber = vm.formData.projectNumber;
      vm.projectModel.$save();
      vm.cancel();
    };

    vm.cancel = function () {
      vm.form.$rollbackViewValue();
      vm.form.$setPristine();
      vm.form.$setUntouched();
      vm.projectModel = null;
    };

    vm.create = function () {
      vm.cancel();
      vm.projectModel = ProjectCollection.$new();
      console.log(vm.customerCollection);
    };

    if (vm.projectModel) {
      vm.setModel(vm.projectModel);
    }
  }

})(angular);
