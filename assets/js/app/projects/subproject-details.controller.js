(function (angular) {
  "use strict";
  angular
    .module("app.projects")
    .controller("app.projects.subprojectDetails.controller", ProjectDetailsController);

  ProjectDetailsController.$inject = ['$scope', 'subprojectModel'];

  function ProjectDetailsController($scope, subprojectModel) {
    var vm = this;
    vm.subprojectModel = subprojectModel;
  }

})(angular);
