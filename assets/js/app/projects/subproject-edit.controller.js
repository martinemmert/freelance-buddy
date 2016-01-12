(function (angular) {
  "use strict";
  angular
    .module("app.projects")
    .controller("app.projects.subprojectEdit.controller", CustomerEditController);

  CustomerEditController.$inject = ['$scope', '$state', 'projectModel', 'subprojectModel'];

  function CustomerEditController($scope, $state, projectModel, subprojectModel) {
    var vm = this;

    vm.projectModel = projectModel;
    vm.subprojectModel = subprojectModel;
    vm.form = null;
    vm.formData = {};

    if (subprojectModel.$isStored) {
      vm.formData.title = subprojectModel.title;
      vm.formData.projectNumber = subprojectModel.projectNumber;
    }

    vm.save = function () {
      vm.subprojectModel.projectId = vm.projectModel.id;
      vm.subprojectModel.title = vm.formData.title;
      vm.subprojectModel.projectNumber = vm.formData.projectNumber;
      vm.subprojectModel.$save().then(function (model) {
        $state.go('projects.details.subprojectDetails', {subprojectId: vm.subprojectModel.id});
      });
    };

    vm.cancel = function () {
      if (vm.subprojectModel.$isStored) {
        $state.go('projects.details.subprojectDetails', {subprojectId: vm.subprojectModel.id});
      } else {
        $state.go('^');
      }
    };
  }

})(angular);
