(function (angular) {
  "use strict";
  angular
    .module("app.projects")
    .controller("app.projects.projectDelete.controller", ProjectDeleteController);

  ProjectDeleteController.$inject = ['$scope', '$state', 'projectModel'];

  function ProjectDeleteController($scope, $state, projectModel) {
    var vm = this;
    vm.projectModel = projectModel;
    vm.delete = function () {
      vm.projectModel.$delete().then(function () {
        $state.go('^');
        vm.projectModel = null;
      });
    };

    vm.cancel = function () {
      $state.go("^.details", {projectId: vm.projectModel.id});
    }
  }

})(angular);
