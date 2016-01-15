(function (angular) {
  "use strict";

  angular.module('app.shared')
    .directive('fcSelect', FormControlTextInputDirective);

  FormControlTextInputDirective.$inject = ['app.shared.TEMPLATE_PATH'];

  function FormControlTextInputDirective(TEMPLATE_PATH) {
    return {
      restrict: "E",
      templateUrl: TEMPLATE_PATH + 'form-control-select.tpl.html',
      scope: {},
      multiElement: true,
      compile: function (tElement, tAttrs) {
        tElement.find('select').attr('ng-options', tAttrs.fcOptions);
        return postLink
      },
      controller: FormControlTextInputDirectiveController,
      controllerAs: 'ctrl',
      bindToController: {
        fcForm: '=',
        fcName: '@',
        fcLabel: '@',
        fcModel: '=',
        fcCollection: '=',
        fcExtraAttr: '=',
        fcExtraProp: '='
      }
    };

    function postLink(scope, element, attributes, controller) {
      var $inputField = element.find('select');
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
    vm.fcId = "form-control-select-" + this.fcName;
  }

})(angular);
