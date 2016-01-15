(function (angular) {
  "use strict";

  angular
    .module('app.shared')
    .directive('sectionTitle', SectionTitleDirective);

  function SectionTitleDirective() {
    return {
      restrict: "A",
      scope: {},
      template: "{{ctrl.title}}",
      controller: SectionTitleController,
      controllerAs: "ctrl"
    };

  }

  SectionTitleController.$inject = ['$state'];

  function SectionTitleController($state) {
    var vm = this;
    vm.title = _.capitalize($state.current.name);
  }

})(angular);
