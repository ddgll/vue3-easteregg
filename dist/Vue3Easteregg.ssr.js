'use strict';var vue=require('vue');function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
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

  if (typeof document === 'undefined') { return; }

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

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = script;

  // Attach install function executed by Vue.use()
  installable.install = function (app) {
    app.component('easteregg', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,default:component});// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)
Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    exportName = _ref2[0],
    exported = _ref2[1];
  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;