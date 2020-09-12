import TheFooter from "@/components/TheFooter.vue";
import { shallowMount } from "@vue/test-utils";

describe("TheFooter.vue", () => {
  it("render contents", () => {
    const msg = "@Author: Nag729 / ooyu-kioo";
    const wrapper = shallowMount(TheFooter);
    expect(wrapper.text()).toBe(msg);
  });
});
