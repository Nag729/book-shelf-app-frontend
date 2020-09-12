// TODO: Jestのグローバル設定ファイルを作成
// https://github.com/buefy/buefy/issues/1249
// TODO: Buefyの設定を入れる
// TODO: auth0のエラーを解消

import Vue from "vue";
// Import the Auth0 configuration
import { domain, clientId } from "../../../auth_config.json";
// Import the plugin here
import { Auth0Plugin } from "../../../src/auth";
// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

import { shallowMount } from "@vue/test-utils";
import TheHeader from "@/components/TheHeader.vue";

describe("TheHeader.vue", () => {
  it("render contents", () => {
    const wrapper = shallowMount(TheHeader);
    // #book-icon というimageが1件存在すること
    expect(wrapper.findAll("#book-icon").length).toBe(1);
  });
});
