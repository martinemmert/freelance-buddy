(function (angular) {
  "use strict";

  angular.module('app.shared')
    .directive('fcTextInput', FormControlTextInputDirective);

  FormControlTextInputDirective.$inject = ['app.shared.TEMPLATE_PATH'];

  function FormControlTextInputDirective(TEMPLATE_PATH) {
    return {
      restrict: "E",
      templateUrl: TEMPLATE_PATH + 'form-control-text-input.tpl.html',
      scope: {},
      link: postLink,
      controller: FormControlTextInputDirectiveController,
      controllerAs: 'ctrl',
      bindToController: {
        fcForm: '=',
        fcType: '@',
        fcName: '@',
        fcPrefix: '@',
        fcLabel: '@',
        fcSuffix: '@',
        fcModel: '=',
        fcExtraAttr: '=',
        fcExtraProp: '='
      }
    };

    function postLink(scope, element, attributes, controller) {
      var $inputField = element.find('input');
      _.each(controller.fcExtraAttr, function (value, key) {
        $inputField.attr(key, value);
        console.log(key, value);
      });

      _.each(controller.fcExtraProp, function (value, key) {
        $inputField.prop(key, value);
      });
    }
  }

  FormControlTextInputDirectiveController.$inject = ['$scope'];

  function FormControlTextInputDirectiveController($scope) {
    var vm = this;
    vm.fcId = "form-control-input-" + this.fcName;
  }

})(angular);
