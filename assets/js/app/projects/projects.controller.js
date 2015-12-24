(function (angular) {
  "use strict";

  angular
    .module("app.projects")
    .controller('app.projects.controller', ProjectsController);

  ProjectsController.$inject = ['$scope', 'ProjectCollection'];

  function ProjectsController($scope, ProjectCollection) {

    var vm = this;
    vm.projectCollection = ProjectCollection;
    vm.projectCollectionLoaded = ProjectCollection.$isLoaded;

    vm.selectModel = function (model) {
      vm.selectedModel = model;
    };

    load();

    function load() {
      ProjectCollection.$query().then(function () {
        vm.projectCollectionLoaded = ProjectCollection.$isLoaded;
      });
    }

  }

})(angular);
