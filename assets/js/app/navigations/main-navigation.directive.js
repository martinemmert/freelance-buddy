(function (angular) {
  "use strict";

  angular
    .module("app.navigations")
    .directive('mainNavigation', MainNavigationDirective);

  MainNavigationDirective.$inject = ['app.navigations.TEMPLATE_PATH'];

  function MainNavigationDirective(TEMPLATE_PATH) {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: TEMPLATE_PATH + 'main-navigation.tpl.html',
      link: postLink,
      controller: DirectiveController,
      controllerAs: 'ctrl'
    };

    function postLink($scope, element, attributes, controller) {

    }
  }

  DirectiveController.$inject = ['$scope', '$state'];

  function DirectiveController($scope, $state) {
    var vm              = this,
        availableStates = $state.get();

    vm.states = [];

    availableStates.forEach(function (state) {
      if (state.name != "" && state.name.indexOf(".") == -1) {
        vm.states.push(state);
      }
    });

  }

})(angular);
