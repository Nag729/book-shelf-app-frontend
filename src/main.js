import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// UI Component
import Buefy from 'buefy';
Vue.use(Buefy, {
  defaultIconPack: 'mdi'
});

// axios(for Google Books API)
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

// Vue Apollo
import { createProvider } from './vue-apollo';

// RestLink for the REST API
// const restLink = new RestLink({
//   uri: 'https://www.googleapis.com/books/v1/',
// });

// Import the Auth0 configuration
import { domain, clientId, audience } from './../auth_config.json';

// Import the plugin here
import { Auth0Plugin } from './auth';

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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app');
