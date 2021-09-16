<script>
import { defineComponent, h, ref, onMounted, onBeforeUnmount } from 'vue';

export default /*#__PURE__*/defineComponent({
  name: 'easteregg', // vue component name
  props: [ 'eggs', 'duration' ],
  emits: ['easter'],
  setup (props, { emit, slots }) {
    let timer, buffer = ''
    const chars = []
    const visible = ref(false)
    const defaultEggs = [
      'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba',
      'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightBA',
      '88224646ba',
      '88224646BA'
    ]

    const resetBuffer = () => {
      if (timer) clearTimeout(timer)
      buffer = ''
    }
    const resetEasterEgg = () => {
      resetBuffer()
      visible.value = false
    }

    const err = 'Eggs property must be a String, an Array of char, an Array of string or an Array of Array of char'
    const getEggs = () => {
      if (!props.eggs || !props.eggs.length) return defaultEggs
      if (typeof props.eggs === 'string') return [props.eggs]
      if (Array.isArray(props.eggs)) {
        return props.eggs.map(e => {
          if (typeof e === 'string') return e
          if (Array.isArray(e)) return e.join('')
          throw new Error(err)
        })
      }
      throw new Error(err)
    }
    const eggs = getEggs()

    const onKeyUp = (e) => {
      if (timer) clearTimeout(timer)
      chars.push(e.key)
      buffer = `${buffer}${e.key}`
      for (let egg of eggs) {
        console.log(buffer, '!==', egg, buffer !== egg)
        if (buffer !== egg) continue
        emit('easter', egg)
        visible.value = true
        chars.length = 0
        buffer = ''
        if (props.duration) setTimeout(resetEasterEgg, props.duration)
        return
      }
      timer = setTimeout(resetBuffer, 1000)
    }

    onMounted(() => window.addEventListener('keyup', onKeyUp))
    onBeforeUnmount(() => window.removeEventListener('keyup', onKeyUp))

    return () =>
      h(
        'div',
        {
          class: ['Vue3Easteregg', { 'visible': visible.value }]
        },
        slots.default ? slots.default() : null
      )
  }
});
</script>

<style scoped>
  .Vue3Easteregg {
    display: none;
  }
  .Vue3Easteregg.visible {
    display: block;
  }
</style>
