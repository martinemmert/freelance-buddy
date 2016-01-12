(function (angular) {
  "use strict";
  angular
    .module("app.projects")
    .controller("app.projects.projectEdit.controller", CustomerEditController);

  CustomerEditController.$inject = ['$scope', '$state', 'customerCollection', 'projectModel'];

  function CustomerEditController($scope, $state, customerCollection, projectModel) {
    var vm = this;

    vm.projectModel = projectModel;
    vm.customerCollection = customerCollection;
    vm.form = null;
    vm.formData = {};

    if (projectModel.$isStored) {
      customerCollection.get(projectModel.customerId).then(function (model) {
        vm.formData.selectedCustomer = model;
      });
      vm.formData.title = projectModel.title;
      vm.formData.projectNumber = projectModel.projectNumber;
    } else {
      vm.formData.selectedCustomer = null;
    }

    vm.save = function () {
      vm.projectModel.customerId = vm.formData.selectedCustomer.id;
      vm.projectModel.title = vm.formData.title;
      vm.projectModel.projectNumber = vm.formData.projectNumber;
      vm.projectModel.$save().then(function (model) {
        $state.go('^.details', {projectId: model.id});
      });
    };

    vm.cancel = function () {
      if (vm.projectModel.$isStored) {
        $state.go('^.details', {projectId: vm.projectModel.id});
      } else {
        $state.go('^');
      }
    };
  }

})(angular);
