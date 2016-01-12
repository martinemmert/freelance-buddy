(function (angular) {
  "use strict";

  angular
    .module("meNgModels")
    .provider('$model', $ModelProvider);

  $ModelProvider.$inject = ['$provide'];

  function $ModelProvider($provide) {
    var suffix = "Model";

    this.$get = ['$injector', function ($injector) {
      return function (name) {
        return $injector.get(name + suffix);
      }
    }];

    this.register = function (name, factory) {
      if (angular.isObject(name)) {
        var models = {};
        angular.forEach(name, function (model, key) {
          models[key] = register(key, model);
        });
        return models;
      } else {
        $provide.factory(name + suffix, ['$injector', '$class', 'ModelRelationBuilder', function ($injector, $class, ModelRelationBuilder) {
          var BaseModel       = $class('BaseModel'),
              modelDefinition = $injector.invoke(factory),
              proto           = {
                fields: modelDefinition.fields,
                validation: modelDefinition.validation || {},
                composed: modelDefinition.composed || {}
              };

          if (modelDefinition.hasMany) {
            modelDefinition.hasMany.forEach(function (relation) {
              ModelRelationBuilder.createHasMany(proto.composed, relation.compositeField, relation.relation, relation.relationField, relation.relationKey)
            });
          }

          if (modelDefinition.belongsTo) {
            modelDefinition.belongsTo.forEach(function (relation) {
              ModelRelationBuilder.createBelongsTo(proto.composed, relation.compositeField, relation.relation, relation.relationField);
            });
          }

          if (modelDefinition.hasOne) {
            modelDefinition.hasOne.forEach(function (relation) {
              ModelRelationBuilder.createHasOne(proto.composed, relation.compositeField, relation.relation, relation.relationField);
            });
          }

          if (modelDefinition.methods) {
            _.extend(proto, modelDefinition.methods);
          }

          return BaseModel.extend(modelDefinition.url, proto);
        }]);
      }
    };
  }

})(angular);
