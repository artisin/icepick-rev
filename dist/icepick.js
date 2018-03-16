/*!
 * The MIT License
 * 
 * Copyright (c) 2017 Alex Early
 * https://github.com/aearly/icepick
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */


/* eslint-disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["icepick"] = factory();
	else
		root["icepick"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * This allows you to work with object hierarchies that have been frozen
 * with Object.freeze().  "get" operations can use the normal JS syntax,
 * but operations that modify the data will have to return partial copies of
 * the structure. The portions of the structure that did not change will
 * === their previous values.
 *
 * Inspired by clojure/mori and Immutable.js
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var i = exports;

var identity = function identity(coll) {
  return coll;
};

// we only care about objects or arrays for now
var weCareAbout = function weCareAbout(val) {
  return val !== null && (Array.isArray(val) ||
  // This will skip objects created with `new Foo()`
  // and objects created with `Object.create(proto)`
  // The benefit is ignoring DOM elements and event emitters,
  // which are often circular.
  isObjectLike(val));
};

var isObjectLike = function isObjectLike(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && val.constructor === Object && Object.getPrototypeOf(val) === Object.prototype;
};

var forKeys = function forKeys(obj, iter) {
  var idx = void 0,
      keys = void 0;
  if (Array.isArray(obj)) {
    idx = obj.length;
    while (idx--) {
      iter(idx);
    }
    return;
  }
  keys = Object.keys(obj);
  idx = keys.length;
  while (idx--) {
    iter(keys[idx]);
  }
};

var cloneObj = function cloneObj(obj) {
  var newObj = {};
  var keys = Object.keys(obj);
  var idx = keys.length;
  var key = void 0;
  while (idx--) {
    key = keys[idx];
    newObj[key] = obj[key];
  }
  return newObj;
};

var clone = function clone(coll) {
  if (Array.isArray(coll)) {
    return coll.slice();
  } else {
    return cloneObj(coll);
  }
};

var freezeIfNeeded = process.env.NODE_ENV === 'production' ? identity : function (coll) {
  if (weCareAbout(coll) && !Object.isFrozen(coll)) {
    return baseFreeze(coll);
  }
  return coll;
};

var _freeze = process.env.NODE_ENV === 'production' ? identity : function (coll) {
  if ((typeof coll === 'undefined' ? 'undefined' : _typeof(coll)) === 'object') {
    return Object.freeze(coll);
  } else {
    return coll;
  }
};

var prevNodes = [];

var baseFreeze = function baseFreeze(coll) {
  if (prevNodes.some(function (val) {
    return val === coll;
  })) {
    throw new Error('object has a reference cycle');
  }
  prevNodes.push(coll);
  forKeys(coll, function (key) {
    var prop = coll[key];
    if (weCareAbout(prop)) {
      baseFreeze(prop);
    }
  });
  prevNodes.pop();

  Object.freeze(coll);
  return coll;
};

/**
 * recrursively freeze an object and all its child objects
 * @param  {Object|Array} coll
 * @return {Object|Array}
 */
exports.freeze = process.env.NODE_ENV === 'production' ? identity : baseFreeze;

/**
 * recursively un-freeze an object, by cloning frozen collections
 * @param  {[type]} coll [description]
 * @return {[type]}      [description]
 */
exports.thaw = function thaw(coll) {
  if (!weCareAbout(coll) || !Object.isFrozen(coll)) return coll;

  var newColl = Array.isArray(coll) ? new Array(coll.length) : {};

  forKeys(coll, function (key) {
    newColl[key] = thaw(coll[key]);
  });
  return newColl;
};

/**
 * set a value on an object or array
 * @param  {Object|Array}  coll
 * @param  {String|Number} key   Key or index
 * @param  {Object}        value
 * @return {Object|Array}        new object hierarchy with modifications
 */
exports.assoc = function assoc(coll, key, value) {
  if (coll[key] === value) {
    return _freeze(coll);
  }

  var newObj = clone(coll);

  newObj[key] = freezeIfNeeded(value);

  return _freeze(newObj);
};
exports.set = exports.assoc;

/**
 * un-set a value on an object or array
 * @param  {Object|Array}  coll
 * @param  {String|Number} key  Key or Index
 * @return {Object|Array}       New object or array
 */
exports.dissoc = function dissoc(coll, key) {
  var newObj = clone(coll);

  delete newObj[key];

  return _freeze(newObj);
};
exports.unset = exports.dissoc;

/**
 * set a value deep in a hierarchical structure
 * @param  {Object|Array} coll
 * @param  {Array}        path    A list of keys to traverse
 * @param  {Object}       value
 * @return {Object|Array}       new object hierarchy with modifications
 */
exports.assocIn = function assocIn(coll, path, value) {
  var key0 = path[0];
  if (path.length === 1) {
    // simplest case is a 1-element array.  Just a simple assoc.
    return i.assoc(coll, key0, value);
  } else {
    // break the problem down.  Assoc this object with the first key
    // and the result of assocIn with the rest of the keys
    return i.assoc(coll, key0, assocIn(coll[key0] || {}, path.slice(1), value));
  }
};
exports.setIn = exports.assocIn;

/**
 * un-set a value on an object or array
 * @param  {Object|Array}  coll
 * @param  {Array} path  A list of keys to traverse
 * @return {Object|Array}       New object or array
 */
exports.dissocIn = function dissocIn(coll, path) {
  var key0 = path[0];
  if (!coll.hasOwnProperty(key0)) {
    return coll;
  }
  if (path.length === 1) {
    // simplest case is a 1-element array.  Just a simple dissoc.
    return i.dissoc(coll, key0);
  } else {
    // break the problem down.  Assoc this object with the first key
    // and the result of dissocIn with the rest of the keys
    return i.assoc(coll, key0, dissocIn(coll[key0], path.slice(1)));
  }
};
exports.unsetIn = exports.dissocIn;

/**
 * get an object from a hierachy based on an array of keys
 * @param  {Object|Array} coll
 * @param  {Array}        path    list of keys
 * @return {Object}       value, or undefined
 */
function baseGet(coll, path) {
  return (path || []).reduce(function (curr, key) {
    if (!curr) {
      return;
    }
    return curr[key];
  }, coll);
}

exports.getIn = baseGet;

/**
 * Update a value in a hierarchy
 * @param  {Object|Array}   coll
 * @param  {Array}          path     list of keys
 * @param  {Function} callback The existing value with be passed to this.
 *                             Return the new value to set
 * @return {Object|Array}      new object hierarchy with modifications
 */
exports.updateIn = function updateIn(coll, path, callback) {
  var existingVal = baseGet(coll, path);
  return i.assocIn(coll, path, callback(existingVal));
};

// generate wrappers for the mutative array methods
['push', 'unshift', 'pop', 'shift', 'reverse', 'sort'].forEach(function (methodName) {
  exports[methodName] = function (arr, val) {
    var newArr = [].concat(_toConsumableArray(arr));

    newArr[methodName](freezeIfNeeded(val));

    return _freeze(newArr);
  };

  exports[methodName].displayName = 'icepick.' + methodName;
});

// splice is special because it is variadic
exports.splice = function splice(arr) {
  var newArr = [].concat(_toConsumableArray(arr));

  for (var _len = arguments.length, _args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    _args[_key - 1] = arguments[_key];
  }

  var args = _args.map(freezeIfNeeded);

  newArr.splice.apply(newArr, args);

  return _freeze(newArr);
};

// slice is non-mutative
exports.slice = function slice(arr, arg1, arg2) {
  var newArr = arr.slice(arg1, arg2);

  return _freeze(newArr);
};

['map', 'filter'].forEach(function (methodName) {
  exports[methodName] = function (fn, arr) {
    var newArr = arr[methodName](fn);

    return _freeze(newArr);
  };

  exports[methodName].displayName = 'icepick.' + methodName;
});

exports.extend = exports.assign = function assign(obj) {
  for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    objs[_key2 - 1] = arguments[_key2];
  }

  var newObj = objs.reduce(singleAssign, obj);

  return _freeze(newObj);
};

function singleAssign(obj1, obj2) {
  return Object.keys(obj2).reduce(function (obj, key) {
    return i.assoc(obj, key, obj2[key]);
  }, obj1);
}

exports.merge = merge;
function merge(target, source, resolver) {
  if (target == null || source == null) {
    return target;
  }
  return Object.keys(source).reduce(function (obj, key) {
    var sourceVal = source[key];
    var targetVal = obj[key];

    var resolvedSourceVal = resolver ? resolver(targetVal, sourceVal, key) : sourceVal;

    if (weCareAbout(sourceVal) && weCareAbout(targetVal)) {
      // if they are both frozen and reference equal, assume they are deep equal
      if (resolvedSourceVal === targetVal && (process.env.NODE_ENV === 'production' || Object.isFrozen(resolvedSourceVal) && Object.isFrozen(targetVal))) {
        return obj;
      }
      if (Array.isArray(sourceVal)) {
        return i.assoc(obj, key, resolvedSourceVal);
      }
      // recursively merge pairs of objects
      return assocIfDifferent(obj, key, merge(targetVal, resolvedSourceVal, resolver));
    }

    // primitive values, stuff with prototypes
    return assocIfDifferent(obj, key, resolvedSourceVal);
  }, target);
}

function assocIfDifferent(target, key, value) {
  if (target[key] === value) {
    return target;
  }
  return i.assoc(target, key, value);
}

var chainProto = {
  value: function value() {
    return this.val;
  },
  thru: function thru(fn) {
    this.val = freezeIfNeeded(fn(this.val));
    return this;
  }
};

Object.keys(exports).forEach(function (methodName) {
  if (methodName.match(/^(map|filter)$/)) {
    chainProto[methodName] = function (fn) {
      this.val = exports[methodName](fn, this.val);
      return this;
    };
    return;
  }
  chainProto[methodName] = function () {
    var _exports;

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    this.val = (_exports = exports)[methodName].apply(_exports, [this.val].concat(args));
    return this;
  };
});

exports.chain = function chain(val) {
  var wrapped = Object.create(chainProto);
  wrapped.val = val;
  return wrapped;
};

// for testing
if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'production') {
  exports._weCareAbout = weCareAbout;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=icepick.js.map