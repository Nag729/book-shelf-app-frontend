// axios(for Google Books API)
import axios from 'axios';
// UI Component
import Buefy from 'buefy';
import Vue from 'vue';
import VueAxios from 'vue-axios';
// Import the Auth0 configuration
import { audience, clientId, domain } from './../auth_config.json';
// RestLink for the REST API
// const restLink = new RestLink({
//   uri: 'https://www.googleapis.com/books/v1/',
// });
import App from './App.vue';
// Import the plugin here
import { Auth0Plugin } from './auth';
import router from './router';
import store from './store';
// Vue Apollo
import { createProvider } from './vue-apollo';

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
});

Vue.use(VueAxios, axios);

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.devtools = true;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app');
