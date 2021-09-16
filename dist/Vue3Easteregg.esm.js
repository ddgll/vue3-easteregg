import { defineComponent, ref, onMounted, onBeforeUnmount, h } from 'vue';

var script = /*#__PURE__*/defineComponent({
  name: 'easteregg',
  // vue component name
  props: ['eggs', 'duration'],
  emits: ['easter'],

  setup(props, {
    emit,
    slots
  }) {
    let timer,
        buffer = '';
    const chars = [];
    const visible = ref(false);
    const defaultEggs = ['ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba', 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightBA', '88224646ba', '88224646BA'];

    const resetBuffer = () => {
      if (timer) clearTimeout(timer);
      buffer = '';
    };

    const resetEasterEgg = () => {
      resetBuffer();
      visible.value = false;
    };

    const err = 'Eggs property must be a String, an Array of char, an Array of string or an Array of Array of char';

    const getEggs = () => {
      if (!props.eggs || !props.eggs.length) return defaultEggs;
      if (typeof props.eggs === 'string') return [props.eggs];

      if (Array.isArray(props.eggs)) {
        return props.eggs.map(e => {
          if (typeof e === 'string') return e;
          if (Array.isArray(e)) return e.join('');
          throw new Error(err);
        });
      }

      throw new Error(err);
    };

    const eggs = getEggs();

    const onKeyUp = e => {
      if (timer) clearTimeout(timer);
      chars.push(e.key);
      buffer = `${buffer}${e.key}`;

      for (let egg of eggs) {
        console.log(buffer, '!==', egg, buffer !== egg);
        if (buffer !== egg) continue;
        emit('easter', egg);
        visible.value = true;
        chars.length = 0;
        buffer = '';
        if (props.duration) setTimeout(resetEasterEgg, props.duration);
        return;
      }

      timer = setTimeout(resetBuffer, 1000);
    };

    onMounted(() => window.addEventListener('keyup', onKeyUp));
    onBeforeUnmount(() => window.removeEventListener('keyup', onKeyUp));
    return () => h('div', {
      class: ['Vue3Easteregg', {
        'visible': visible.value
      }]
    }, slots.default ? slots.default() : null);
  }

});

function styleInject(css, ref) {
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
}

var css_248z = "\n.Vue3Easteregg[data-v-29ecbf28] {\n    display: none;\n}\n.Vue3Easteregg.visible[data-v-29ecbf28] {\n    display: block;\n}\n";
styleInject(css_248z);

script.__scopeId = "data-v-29ecbf28";

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = script; // Attach install function executed by Vue.use()

  installable.install = app => {
    app.component('easteregg', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
