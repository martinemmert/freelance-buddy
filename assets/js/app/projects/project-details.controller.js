(function (angular) {
  "use strict";
  angular
    .module("app.projects")
    .controller("app.projects.projectDetails.controller", ProjectDetailsController);

  ProjectDetailsController.$inject = ['$scope', 'projectModel', 'subprojectCollection'];

  function ProjectDetailsController($scope, projectModel, subprojectCollection) {
    var vm = this;
    vm.projectModel = projectModel;
    vm.subprojectCollection = subprojectCollection;
  }

})(angular);
