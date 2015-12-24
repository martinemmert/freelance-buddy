(function (angular) {
  "use strict";

  angular
    .module('app.subprojects')
    .directive('subprojectForm', SubprojectFormDirective);

  SubprojectFormDirective.$inject = ['app.subprojects.TEMPLATE_PATH'];

  function SubprojectFormDirective(TEMPLATE_PATH) {

    return {
      restrict: 'E',
      scope: {},
      templateUrl: TEMPLATE_PATH + "subproject-form.tpl.html",
      controller: SubprojectFormDirectiveController,
      controllerAs: 'vm',
      bindToController: {
        'subprojectModel': "="
      },
      link: postLink
    };

    function postLink(scope) {
      scope.$watch('vm.subprojectModel', function (newModel, oldModel, scope) {
        if (newModel) scope.vm.setModel(newModel);
      });
    }
  }

  SubprojectFormDirectiveController.$inject = ['SubprojectCollection', 'ProjectCollection'];

  function SubprojectFormDirectiveController(SubprojectCollection, ProjectCollection) {

    var vm = this;

    vm.form = null;
    vm.formData = {};
    vm.projectCollection = ProjectCollection;

    vm.setModel = function (model) {
      if (model.$isStored) {
        ProjectCollection.get(model.projectId).then(function (model) {
          vm.formData.selectedProject = model;
        });
      } else {
        vm.formData.selectedProject = null;
      }
      vm.formData.title = model.title;
      vm.formData.projectNumber = model.projectNumber;
    };

    vm.save = function () {
      vm.subprojectModel.projectId = vm.formData.selectedProject.id;
      vm.subprojectModel.title = vm.formData.title;
      vm.subprojectModel.projectNumber = vm.formData.projectNumber;
      vm.subprojectModel.$save();
      vm.cancel();
    };

    vm.cancel = function () {
      vm.form.$rollbackViewValue();
      vm.form.$setPristine();
      vm.form.$setUntouched();
      vm.subprojectModel = null;
    };

    vm.create = function () {
      vm.cancel();
      vm.subprojectModel = SubprojectCollection.$new();
    };

    if (vm.subprojectModel) {
      vm.setModel(vm.subprojectModel);
    }
  }

})(angular);
