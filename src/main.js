import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Buefy from 'buefy';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { RestLink } from 'apollo-link-rest';

Vue.config.productionTip = false;

// UI Component
Vue.use(Buefy, {
  defaultIconPack: 'mdi',
});

// axios(for Google Books API)
Vue.use(VueAxios, axios);

// RestLink for the REST API
// const restLink = new RestLink({
//   uri: 'https://www.googleapis.com/books/v1/',
// });

// Apollo
const apolloClient = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',
  uri: 'http://localhost:3000/graphql',
  // uri: 'https://book-shelf-backend.herokuapp.com/graphql',

  // link: restLink,
  cache: new InMemoryCache(),
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo);

new Vue({
  router,
  store,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
