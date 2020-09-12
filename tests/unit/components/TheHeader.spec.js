import TheHeader from '@/components/TheHeader.vue';
import { shallowMount } from '@vue/test-utils';

describe('TheHeader.vue', () => {
  it('render static contents', () => {
    const wrapper = shallowMount(TheHeader);
    // Link, Buttonが存在すること
    expect(wrapper.find('#book-icon').exists()).toBe(true);
    expect(wrapper.find('#home-link').exists()).toBe(true);
    expect(wrapper.find('#book-shelf-link').exists()).toBe(true);
  });

  it('render contents under Not Authenticated', () => {
    const $auth = {
      isAuthenticated: false
    };
    const wrapper = shallowMount(TheHeader, {
      mocks: {
        $auth
      }
    });

    // 未認証の場合、Log inボタンが表示されること
    expect($auth.isAuthenticated).toBe(false);
    expect(wrapper.find('#login').exists()).toBe(true);
    // Log outボタンが非表示であること
    expect(wrapper.find('#logout').exists()).toBe(false);
  });

  it('render contents under Authenticated', () => {
    const $auth = {
      isAuthenticated: true
    };
    const wrapper = shallowMount(TheHeader, {
      mocks: {
        $auth
      }
    });

    // 認証済みの場合、Log inボタンが非表示であること
    expect($auth.isAuthenticated).toBe(true);
    expect(wrapper.find('#login').exists()).toBe(false);
    // Log outボタンが非表示であること
    expect(wrapper.find('#logout').exists()).toBe(true);
  });

  // TODO: test login() & logout()
});
