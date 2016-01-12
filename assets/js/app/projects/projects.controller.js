(function (angular) {
  "use strict";

  angular
    .module("app.projects")
    .controller('app.projects.controller', ProjectsController);

  ProjectsController.$inject = ['$scope', 'projectCollection'];

  function ProjectsController($scope, projectCollection) {
    var vm = this;
    vm.projectCollection = projectCollection;
  }

})(angular);
