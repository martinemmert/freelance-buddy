(function (angular) {
  "use strict";

  angular
    .module("meNgModels")
    .provider('$model', $ModelProvider);

  $ModelProvider.$inject = ['$provide'];

  function $ModelProvider($provide) {
    var suffix = "Model";

    function register(name, factory) {
      if (angular.isObject(name)) {
        var models = {};
        angular.forEach(name, function (model, key) {
          models[key] = register(key, model);
        });
        return models;
      } else {
        $provide.factory(name + suffix, ['$injector', '$q', '$class', 'ModelRelationBuilder', function ($injector, $q, $class, ModelRelationBuilder) {
          var BaseModel       = $class('BaseModel'),
              modelDefinition = $injector.invoke(factory),
              proto           = {
                fields: modelDefinition.fields,
                validation: modelDefinition.validation || {},
                composed: modelDefinition.composed
              };

          if (modelDefinition.hasMany) {
            modelDefinition.hasMany.forEach(function (relation) {
              proto.composed[relation.compositeField] = {
                configurable: true,
                get: ModelRelationBuilder.createHasMany.call(this, relation.compositeField, relation.relation, relation.relationField, relation.relationKey)
              };
              proto.composed["$" + relation.compositeField] = {
                get: function () {
                  return $q.when(this[modelDefinition.hasMany.compositeField]);
                }
              }
            });
          }

          if (modelDefinition.belongsTo) {
            modelDefinition.belongsTo.forEach(function (relation) {
              proto.composed[relation.compositeField] = {
                get: ModelRelationBuilder.createBelongsTo.call(this, relation.compositeField, relation.relation, relation.relationField)
              };
              proto.composed["$" + relation.compositeField] = {
                get: function () {
                  return $q.when(this[relation.compositeField]);
                }
              }
            });
          }

          if (modelDefinition.hasOne) {
            modelDefinition.hasOne.forEach(function (relation) {
              proto.composed[relation.compositeField] = {
                get: ModelRelationBuilder.createHasOne.call(this, relation.compositeField, relation.relation, relation.relationField)
              };
              proto.composed["$" + relation.compositeField] = {
                get: function () {
                  return $q.when(this[relation.compositeField]);
                }
              }
            });
          }

          if (modelDefinition.methods) {
            _.extend(proto, modelDefinition.methods);
          }

          return BaseModel.extend(modelDefinition.url, proto);
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
