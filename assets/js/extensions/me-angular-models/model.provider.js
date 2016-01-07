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
        $provide.factory(name + suffix, ['$injector', '$class', '$model', '$collection', function ($injector, $class, $model, $collection) {
          var BaseModel       = $class('BaseModel'),
              modelDefinition = $injector.invoke(factory),
              proto           = {
                fields: modelDefinition.fields,
                validation: modelDefinition.validation || {},
                composed: modelDefinition.composed
              };

          if (modelDefinition.hasMany) {
            proto.composed[modelDefinition.hasMany.compositeField] = {
              get: (function (fieldName, relation, relationField, relationKey) {
                var __loading      = false,
                    collectionName = relation;

                //fixme: strange behaviour with the relation property!?

                return function () {
                  var _self    = this,
                      relation = $collection(collectionName);

                  if (!__loading) {
                    __loading = true;
                    // fixme: raw data is returned!!
                    relation.$query().then(function () {
                      Object.defineProperty(_self, fieldName, {value: relation.createSubCollection(relationField, _self[relationKey])});
                      __loading = false;
                    });
                  }

                }
              })(modelDefinition.hasMany.compositeField, modelDefinition.hasMany.relation, modelDefinition.hasMany.relationField, modelDefinition.hasMany.relationKey)
            }
          }

          if (modelDefinition.belongsTo) {
            proto.composed[modelDefinition.belongsTo.compositeField] = {
              get: (function (fieldName, relation, relationField) {
                var __loading = false;
                return function () {
                  var _self = this;
                  if (!__loading) {
                    __loading = true;
                    relation.get(_self[relationField]).then(function (model) {
                      Object.defineProperty(_self, fieldName, {configurable: true, value: model});
                      // by deleting the instance property we are returning to the getter of the prototype
                      _self.$onSaved.addOnce(function () {
                        delete this[fieldName];
                      }, _self);
                      __loading = false;
                      return model;
                    });
                  }
                }
              })(modelDefinition.belongsTo.compositeField, $collection(modelDefinition.belongsTo.relation), modelDefinition.belongsTo.relationField)
            }
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
