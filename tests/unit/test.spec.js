import { mount } from '@vue/test-utils';
import EasterEgg from '@/easteregg.vue';

describe('EasterEgg', () => {
  it('should be a vue instance', () => {
    const wrapper = mount(EasterEgg);
    expect(wrapper.vm).toBeTruthy();
  });
});