'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}var script = /*#__PURE__*/vue.defineComponent({
  name: "easteregg",
  // vue component name
  props: ["eggs", "duration"],
  emits: ["easter"],
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        slots = _ref.slots;
    var timer,
        buffer = "";
    var chars = [];
    var visible = vue.ref(false);
    var defaultEggs = ["ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba", "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightBA", "88224646ba", "88224646BA"];

    var resetBuffer = function resetBuffer() {
      if (timer) clearTimeout(timer);
      buffer = "";
    };

    var resetEasterEgg = function resetEasterEgg() {
      resetBuffer();
      visible.value = false;
    };

    var err = "Eggs property must be a String, an Array of char, an Array of string or an Array of Array of char";

    var getEggs = function getEggs() {
      if (!props.eggs || !props.eggs.length) return defaultEggs;
      if (typeof props.eggs === "string") return [props.eggs];

      if (Array.isArray(props.eggs)) {
        return props.eggs.map(function (e) {
          if (typeof e === "string") return e;
          if (Array.isArray(e)) return e.join("");
          throw new Error(err);
        });
      }

      throw new Error(err);
    };

    var eggs = getEggs();

    var onKeyUp = function onKeyUp(e) {
      if (timer) clearTimeout(timer);
      chars.push(e.key);
      buffer = "".concat(buffer).concat(e.key);

      var _iterator = _createForOfIteratorHelper(eggs),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var egg = _step.value;
          if (buffer !== egg) continue;
          emit("easter", egg);
          visible.value = true;
          chars.length = 0;
          buffer = "";
          if (props.duration) setTimeout(resetEasterEgg, props.duration);
          return;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      timer = setTimeout(resetBuffer, 1000);
    };

    vue.onMounted(function () {
      return window.addEventListener("keyup", onKeyUp);
    });
    vue.onBeforeUnmount(function () {
      return window.removeEventListener("keyup", onKeyUp);
    });
    return function () {
      return vue.h("div", {
        class: ["Vue3Easteregg", {
          visible: visible.value
        }]
      }, slots.default ? slots.default() : null);
    };
  }
});function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = "\n.Vue3Easteregg[data-v-12495b44] {\n  display: none;\n}\n.Vue3Easteregg.visible[data-v-12495b44] {\n  display: block;\n}\n";
styleInject(css_248z);script.__scopeId = "data-v-12495b44";// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = script; // Attach install function executed by Vue.use()

  installable.install = function (app) {
    app.component('easteregg', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;