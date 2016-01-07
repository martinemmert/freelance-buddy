(function (angular) {
  "use strict";

  angular
    .module("meNgModels")
    .provider('$collection', $CollectionProvider);

  $CollectionProvider.$inject = ['$provide'];

  function $CollectionProvider($provide) {
    var suffix = "Collection";

    function register(name, factory) {
      if (angular.isObject(name)) {
        var models = {};
        angular.forEach(name, function (model, key) {
          models[key] = register(key, model);
        });
        return models;
      } else {
        $provide.factory(name + suffix, ['$injector', '$class', function ($injector, $class) {
          var BaseCollection = $class('BaseCollection'),
              collection     = $injector.invoke(factory),
              proto          = {ModelClass: collection.model};

          if (collection.methods) {
            _.extend(proto, collection.methods);
          }

          if (collection.properties) {
            Object.defineProperties(proto, collection.properties);
          }

          return new (BaseCollection.extend(proto));
        }]);
      }
    }

    this.register = register;

    this.$get = ['$injector', function ($injector) {
      return function (name) {
        return $injector.get(name + suffix);
      }
    }];
  }

})(angular);
