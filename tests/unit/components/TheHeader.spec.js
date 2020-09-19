import TheHeader from '@/components/TheHeader.vue';
import { shallowMount } from '@vue/test-utils';

const factory = (isAuth = true) => {
  const $auth = {
    isAuthenticated: isAuth
  };
  return shallowMount(TheHeader, {
    mocks: {
      $auth
    }
  });
};

describe('TheHeader.vue', () => {
  it('render static contents', () => {
    const wrapper = factory();

    // Brand Icon
    const brandIcon = wrapper.find('#book-icon');
    expect(brandIcon.exists()).toBe(true);

    // Home Link
    const homeLink = wrapper.find('#home-link');
    expect(homeLink.exists()).toBe(true);

    // BookShelf Link
    const bookShelfLink = wrapper.find('#book-shelf-link');
    expect(bookShelfLink.exists()).toBe(true);
  });

  it('render contents under Not Authenticated', () => {
    const wrapper = factory(false);
    expect(wrapper.vm.$auth.isAuthenticated).toBe(false);

    // 未認証の場合、Log inボタンが表示されること
    const loginButton = wrapper.find('#login');
    expect(loginButton.exists()).toBe(true);
    expect(loginButton.classes()).toContain('button');
    expect(loginButton.classes()).toContain('is-info');

    // Log outボタンが非表示であること
    const logoutButton = wrapper.find('#logout');
    expect(logoutButton.exists()).toBe(false);
  });

  it('render contents under Authenticated', () => {
    const wrapper = factory(true);
    expect(wrapper.vm.$auth.isAuthenticated).toBe(true);

    // 認証済みの場合、Log inボタンが非表示であること
    const loginButton = wrapper.find('#login');
    expect(loginButton.exists()).toBe(false);

    // Log outボタンが表示されること
    const logoutButton = wrapper.find('#logout');
    expect(logoutButton.exists()).toBe(true);
    expect(logoutButton.classes()).toContain('button');
    expect(logoutButton.classes()).toContain('is-info');
  });
});
