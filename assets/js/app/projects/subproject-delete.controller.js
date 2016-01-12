(function (angular) {
  "use strict";
  angular
    .module("app.projects")
    .controller("app.projects.subprojectDelete.controller", ProjectDeleteController);

  ProjectDeleteController.$inject = ['$scope', '$state', 'subprojectModel'];

  function ProjectDeleteController($scope, $state, subprojectModel) {
    var vm = this;
    vm.subprojectModel = subprojectModel;
    vm.delete = function () {
      vm.subprojectModel.$delete().then(function () {
        $state.go('^');
        vm.subprojectModel = null;
      });
    };

    vm.cancel = function () {
      $state.go("projects.details.subprojectDetails", {
        subprojectId: vm.subprojectModel.id
      });
    }
  }

})(angular);
