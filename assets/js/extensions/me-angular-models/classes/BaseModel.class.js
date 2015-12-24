(function (angular, Signal) {
  "use strict";

  angular
    .module('meNgModels')
    .config(['$classProvider', function ($classProvider) {
      $classProvider.register('BaseModel', BaseModelClassFactory);
    }]);

  BaseModelClassFactory.$inject = ['$class', 'BaseModelApiClass'];

  function BaseModelClassFactory($class, BaseModelApi) {

    function BaseModel(data) {
      var _self = this;

      Object.defineProperty(_self, '_data', {value: {}});

      Object.defineProperty(_self, '$isLoaded', {writable: true, value: false});
      Object.defineProperty(_self, '$isStored', {writable: true, value: false});
      Object.defineProperty(_self, '$isDeleted', {writable: true, value: false});

      Object.defineProperty(_self, '$onSaved', {value: new Signal()});
      Object.defineProperty(_self, '$onLoaded', {value: new Signal()});
      Object.defineProperty(_self, '$onDeleted', {value: new Signal()});

      if (data) _self.$set(data, false);
    }

    BaseModel.extend = function (url, proto) {

      var composedProperties, baseModelChild;

      proto.api = new BaseModelApi(url);

      if (proto.composed) {
        composedProperties = proto.composed;
        delete proto.composed;
      }

      baseModelChild = $class.extend(BaseModel, null, proto);

      _.forEach(baseModelChild.prototype.fields, function (field) {
        Object.defineProperty(baseModelChild.prototype, field, {
          enumerable: true,
          get: function () {
            return this.$get(field);
          },
          set: function (value) {
            this.$set(field, value, true);
          }
        })
      });

      if (composedProperties) {
        Object.defineProperties(baseModelChild.prototype, composedProperties);
      }

      return baseModelChild;
    };

    BaseModel.prototype = Object.create({});
    BaseModel.prototype.constructor = BaseModel;
    BaseModel.prototype.baseFields = ['id', 'createdAt', 'updatedAt'];
    BaseModel.prototype.fields = [];

    _.forEach(BaseModel.prototype.baseFields, function (field) {
      Object.defineProperty(BaseModel.prototype, field, {
        enumerable: true,
        get: function () {
          return this.$get(field);
        }
      });
    });

    Object.defineProperty(BaseModel.prototype, 'tracker', {
      get: function () {
        return this.id;
      }
    });

    Object.defineProperty(BaseModel.prototype, '$get', {
      value: function (name) {
        return this._data[name] ? this._data[name].value : null;
      }
    });

    Object.defineProperty(BaseModel.prototype, '$set', {
      value: function (name, value, setDirty) {
        var _self = this;

        if (arguments.length == 3 && typeof name == "string") {
          if (_self.fields.indexOf(name) != -1 || _self.baseFields.indexOf(name) != -1) {
            if (!_self._data[name]) {
              _self._data[name] = {}
            }

            if (_self._data[name].value != value) {
              _self._data[name].value = value;
              _self._data[name].dirty = setDirty;
            }
          }
        }
        else if (arguments.length == 2 && typeof name == "object") {
          _.forOwn(name, function (val, key) {
            _self.$set(key, val, value);
          });
        }
      }
    });

    Object.defineProperty(BaseModel.prototype, '$getData', {
      enumerable: false,
      value: function () {
        var obj   = {},
            _self = this;
        _.forEach(_self.fields, function (field) {
          obj[field] = _self.$get(field);
        });
        return obj;
      }
    });

    Object.defineProperty(BaseModel.prototype, '$getDirtyData', {
      enumerable: false,
      value: function () {
        var obj   = {},
            _self = this;
        _.forEach(this.fields, function (field) {
          if (_self._data[field] && _self._data[field].dirty == true) {
            obj[field] = _self.$get(field);
          }
        });
        return obj;
      }
    });

    Object.defineProperty(BaseModel.prototype, '$load', {
      enumerable: false,
      value: function (id) {
        var _self = this;
        return _self.api.$get(id).then(function (data) {
          _self.$isLoaded = data != null;
          _self.$isStored = data != null;
          _self.$set(data, false);
          _self.$onLoaded.dispatch(_self);
          return _self;
        });
      }
    });

    Object.defineProperty(BaseModel.prototype, '$save', {
      enumerable: false,
      value: function () {
        var _self = this,
            req   = null;

        if (_self.$isStored) {
          req = _self.api.$update(_self.id, _self.$getDirtyData())
        } else {
          req = _self.api.$save(_self.$getData())
        }

        return req.then(function (data) {
          _self.$isStored = true;
          _self.$isLoaded = true;
          _self.$set(data, false);
          _self.$onSaved.dispatch(_self);
          return _self;
        });
      }
    });

    Object.defineProperty(BaseModel.prototype, '$delete', {
      enumerable: false,
      value: function () {
        var _self = this;
        return _self.api.$delete(_self.id)
          .then(function () {
            //fixme: does not work correctly
            _self.$isDeleted = true;
            _self.$onDeleted.dispatch(_self);
            return _self;
          })
          .catch(function () {
            _self._deleted = false;
          });
      }
    });

    return BaseModel;
  }

})(angular, signals.Signal);
