(function (angular) {
  "use strict";

  angular
    .module("app.projects")
    .controller('app.projects.subprojects.controller', SubprojectsController);

  SubprojectsController.$inject = ['$scope', 'subprojectCollection'];

  function SubprojectsController($scope, subprojectCollection) {
    var vm = this;
    vm.subprojectCollection = subprojectCollection;
  }

})(angular);
