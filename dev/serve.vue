<script>
import { defineComponent, ref } from 'vue';
import easteregg from '@/easteregg.vue';

export default defineComponent({
  name: 'ServeDev',
  setup () {
    return {
      yo: ref(false)
    }
  },
  components: {
    easteregg
  }
});
</script>

<template>
  <table>
    <tr>
      <td>Type the letter "a" 3 times</td>
      <td><easteregg :eggs="'aaa'" :duration="5000">Hi ! for 5 seconds...</easteregg></td>
    </tr>
    <tr>
      <td>Type the letter "b" 3 times or "c" 3 times</td>
      <td>
        <easteregg :eggs="['bbb', 'ccc']">
          <em>Hi forever</em>
          <img src="https://cdn.imgbin.com/6/14/25/birds-owls-finches-beak-bird-of-prey-T3YwQJsk.jpg" />
        </easteregg></td>
    </tr>
    <tr>
      <td>Type ArrowUp ArrowDown OR space 3 times OR space "a" and ArrowUp</td>
      <td>
        <easteregg :eggs="[['ArrowUp', 'ArrowDown'],[' ', ' ', ' '],' aArrowUp']" @easter="yo = $event" />
        <div v-if="yo" class="div3">
          <p>Hi from an event !!</p>
          <p>Secret code: {{yo}}</p></div>
      </td>
    </tr>
  </table>
</template>

<style>
:root {
  --ff-body: "Heebo", sans-serif;
  --ff-heading: "Oswald", sans-serif;

  --fs-lg: clamp(3.5rem, 12vw + 1rem, 8rem);
  --fs-md: clamp(1.5rem, 4vw, 4rem);
  --fs-sm: clamp(1rem, 2vw, 2rem);

  --padding: clamp(1rem, 2vw, 2rem);

  --img-size: 10vw
}
body {
  font-family: var(--ff-body);
  font-size: var(--fs-sm)
}
img {
  width: var(--img-size);
  height: var(--img-size);
}
td {
  font-size: var(--fs-md);
  padding: var(--padding);
  vertical-align: middle;
}
td:first-child {
  max-width: 60vw;
  width: 60vw;
  min-width: 60vw;
}
.div3 {
  border-color: red;
  border-radius: 5px;
  background-color: rgba(255, 0, 0, 0.3)
}
</style>
