(function (angular) {
  "use strict";

  angular
    .module("app.subprojects")
    .controller('app.subprojects.controller', ProjectsController);

  ProjectsController.$inject = ['$scope', 'SubprojectCollection'];

  function ProjectsController($scope, SubprojectCollection) {

    var vm = this;
    vm.subprojectCollection = SubprojectCollection;
    vm.subprojectCollectionLoaded = SubprojectCollection.$isLoaded;

    vm.selectModel = function (model) {
      vm.selectedModel = model;
    };

    load();

    function load() {
      SubprojectCollection.$query().then(function () {
        vm.subprojectCollectionLoaded = SubprojectCollection.$isLoaded;
      });
    }

  }

})(angular);
