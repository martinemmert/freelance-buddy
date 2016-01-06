(function (angular) {
  "use strict";

  angular
    .module("meNgClasses")
    .provider('$class', $ClassProvider);

  $ClassProvider.$inject = ['$provide'];

  function $ClassProvider($provide) {

    var suffix = 'Class';

    this.register = register;
    this.extend = extend;

    this.$get = ['$injector', function ($injector) {
      $class.extend = extend;
      function $class(name) {
        return $injector.get(name + suffix);
      }

      return $class;
    }];


    function register(name, factory) {
      if (angular.isObject(name)) {
        var classes = {};
        angular.forEach(name, function (_class, key) {
          classes[key] = register(key, _class);
        });
        return classes;
      } else {
        return $provide.factory(name + suffix, factory);
      }
    }

    function extend(rootClass, childConstructor, childPrototype) {

      var SurrogateClass = function () {
        rootClass.prototype.constructor.apply(this, arguments);
        if (childConstructor) childConstructor.apply(this, arguments);
      };

      SurrogateClass.prototype = Object.create(rootClass.prototype);
      SurrogateClass.prototype.constructor = SurrogateClass;

      if (childPrototype) {
        _.forEach(Object.getOwnPropertyNames(childPrototype), function (propertyName) {
          Object.defineProperty(SurrogateClass.prototype, propertyName, Object.getOwnPropertyDescriptor(childPrototype, propertyName));
        });
      }

      SurrogateClass.extend = function (childConstructor, childPrototype) {
        return extend(SurrogateClass, childConstructor, childPrototype)
      };

      return SurrogateClass;
    }

  }

})(angular);
