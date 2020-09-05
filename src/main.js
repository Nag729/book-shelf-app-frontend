import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// UI Component
import Buefy from 'buefy';
Vue.use(Buefy, {
  defaultIconPack: 'mdi',
});

// axios(for Google Books API)
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

// RestLink for the REST API
// const restLink = new RestLink({
//   uri: 'https://www.googleapis.com/books/v1/',
// });

// Apollo
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { RestLink } from 'apollo-link-rest';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  // uri: 'https://book-shelf-backend.herokuapp.com/graphql',

  // link: restLink,
  cache: new InMemoryCache(),
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo);

// Import the Auth0 configuration
import { domain, clientId } from './../auth_config.json';
// Import the plugin here
import { Auth0Plugin } from './auth';
// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
